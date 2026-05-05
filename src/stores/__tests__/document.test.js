import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDocumentStore } from '@/stores/document';

// We mock Firebase entirely so that tests never touch the real database or storage.
// Each mock replaces the real Firebase function with a fake version we can control.
vi.mock('@/config/firebase', () => ({
  db: {},
  storage: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn()
}));

vi.mock('firebase/storage', () => ({
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn(() => Promise.resolve('https://fake-url.com/file.pdf'))
}));

import { getDocs, addDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL } from 'firebase/storage';

// Fresh Pinia instance so the store state doesn't carry over
// We also clear all mock call history
beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
});

// --- uploadDocument ---
// These tests check the function that uploads a file to Firebase Storage and saves its metadata to Firestore.
describe('uploadDocument', () => {

  // Test 1: Checks that when we call uploadDocument, it actually calls uploadBytes
  // (to upload the file) and addDoc (to save metadata) with the correct data.
  it('uploads the file and saves metadata to Firestore', async () => {
    // Tell the fake Firebase functions to pretend they succeeded
    uploadBytes.mockResolvedValue();
    getDownloadURL.mockResolvedValue('https://fake-url.com/file.pdf');
    addDoc.mockResolvedValue();

    const store = useDocumentStore();
    const file = { name: 'contract.pdf' };
    await store.uploadDocument({ file, category: 'Kontrakter', title: 'My Contract', clientId: 'client123' });

    // uploadBytes should have been called once to upload the file
    expect(uploadBytes).toHaveBeenCalled();
    // addDoc should have been called with the correct metadata
    expect(addDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        title: 'My Contract',
        category: 'kontrakter',
        clientId: 'client123',
        url: 'https://fake-url.com/file.pdf'
      })
    );
  });

  // Test 2: Checks that if the user doesn't provide a title, the file name is used instead.
  // This tests the fallback logic: title || file.name
  it('falls back to the file name if no title is provided', async () => {
    uploadBytes.mockResolvedValue();
    getDownloadURL.mockResolvedValue('https://fake-url.com/file.pdf');
    addDoc.mockResolvedValue();

    const store = useDocumentStore();
    const file = { name: 'contract.pdf' };

    // Empty string as the title
    await store.uploadDocument({ file, category: 'Kontrakter', title: '', clientId: 'client123' });

    // The title saved to Firestore should be the file name, not an empty string
    expect(addDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ title: 'contract.pdf' })
    );
  });

  // Test 3: Checks that the category is always saved as lowercase in Firestore,
  // even if the user selected it with a capital letter (e.g. 'Plantegninger').
  it('saves the category as lowercase', async () => {
    uploadBytes.mockResolvedValue();
    getDownloadURL.mockResolvedValue('https://fake-url.com/file.pdf');
    addDoc.mockResolvedValue();

    const store = useDocumentStore();
    const file = { name: 'plan.pdf' };

    await store.uploadDocument({ file, category: 'Plantegninger', title: 'Floor Plan', clientId: 'client123' });

    // 'Plantegninger' should be saved as 'plantegninger'
    expect(addDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ category: 'plantegninger' })
    );
  });
});

// --- fetchDocuments ---
// These tests check the function that fetches documents from Firestore and stores them in the documents array on the store.
describe('fetchDocuments', () => {

  // Test 4: Checks that when Firestore returns two documents, store.documents ends up with exactly two items.
  it('stores documents matching the category and clientId', async () => {
    // Fake Firestore
    getDocs.mockResolvedValue({
      docs: [
        { id: 'doc1', data: () => ({ title: 'Contract', category: 'kontrakter', clientId: 'client123' }) },
        { id: 'doc2', data: () => ({ title: 'Plan', category: 'kontrakter', clientId: 'client123' }) }
      ]
    });

    const store = useDocumentStore();
    await store.fetchDocuments('kontrakter', 'client123');

    expect(store.documents).toHaveLength(2);
  });

  // Test 5: Checks that if Firestore returns no results, store.documents ends up as an empty array.
  it('stores an empty array if no documents match', async () => {
    // Fake Firestore returning zero documents
    getDocs.mockResolvedValue({ docs: [] });

    const store = useDocumentStore();
    await store.fetchDocuments('kontrakter', 'client123');

    expect(store.documents).toHaveLength(0);
  });
});

