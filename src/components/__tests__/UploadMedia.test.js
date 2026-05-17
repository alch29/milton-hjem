import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import UploadMedia from '@/components/UploadMedia.vue';

// Mock Firebase so the stores can be created without a real connection
vi.mock('@/config/firebase', () => {
  return {
    db: {},
    auth: {},
    storage: {}
  };
});

vi.mock('firebase/firestore', () => {
  return {
    collection: vi.fn(),
    getDocs: vi.fn(),
    addDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn()
  };
});

vi.mock('firebase/storage', () => {
  return {
    ref: vi.fn(),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn()
  };
});

// Mock useClientId so we don't need a real user in the store
vi.mock('@/composables/useClientId', () => {
  return {
    useClientId: () => {
      return { clientId: { value: 'client-123' } };
    }
  };
});

describe('UploadMedia', () => {

  // Test 1: Checks that when the type prop is 'documents', the component shows
  // the document categories and not the image categories.
  it('shows document categories when type is documents', () => {
    const wrapper = mount(UploadMedia, {
      props: { type: 'documents' },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] }
    });

    // These are document-specific categories
    expect(wrapper.text()).toContain('Kontrakter');
    expect(wrapper.text()).toContain('Godkendelser');

    // These are image-specific categories and should NOT appear
    expect(wrapper.text()).not.toContain('Gulv');
    expect(wrapper.text()).not.toContain('Tag');
  });

  // Test 2: Checks that when the type prop is 'images', the component shows
  // the image categories and not the document categories.
  it('shows image categories when type is images', () => {
    const wrapper = mount(UploadMedia, {
      props: { type: 'images' },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] }
    });

    // These are image-specific categories
    expect(wrapper.text()).toContain('Gulv');
    expect(wrapper.text()).toContain('Tag');

    // These are document-specific categories and should NOT appear
    expect(wrapper.text()).not.toContain('Kontrakter');
    expect(wrapper.text()).not.toContain('Godkendelser');
  });

  // Test 3: Checks that the upload button is disabled when no file and no category
  // has been selected. This prevents the user from submitting an incomplete form.
  it('disables the upload button when no file or category is selected', () => {
    const wrapper = mount(UploadMedia, {
      props: { type: 'documents' },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] }
    });

    // Find all Button components — the upload button is the last one
    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const uploadButton = buttons[buttons.length - 1];

    // The disabled attribute should be present on the root element since no file or category has been chosen
    // (Vue passes it as a fallthrough attribute to the Button's root div)
    expect(uploadButton.attributes('disabled')).toBeDefined();
  });
});
