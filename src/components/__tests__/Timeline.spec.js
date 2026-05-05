import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import Timeline from '../timelineComponents/Timeline.vue';

describe('Timeline', () => {
  it('renders properly', () => {
    const wrapper = mount(Timeline, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    });
    expect(wrapper.text()).toContain('Tidslinje for huset');
  });

  it('toggles between timeline and calendar correctly', async () => {
    const wrapper = mount(Timeline, {
      global: {
        stubs: ['Calendar', 'Card', 'TimelineCard'],
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    });

    // Arrange: Default is timeline
    expect(wrapper.find('.timeline__content').exists()).toBe(true);

    // Act: Click on the calendar button
    const calendarBtn = wrapper.findAll('.timeline__icon')[0];
    await calendarBtn.trigger('click');

    // Verrify: Find calendar component
    expect(wrapper.findComponent({ name: 'Calendar' }).exists()).toBe(true);
    expect(wrapper.find('.timeline__content').exists()).toBe(false);
  });

  it('opens and closes TimelineCard', async () => {
    const mockItems = [{ id: 1, title: 'Test event', date: '2027-03-15' }];

    const wrapper = mount(Timeline, {
      global: {
        stubs: ['Calendar', 'Card', 'TimelineCard'],
        plugins: [createTestingPinia({ 
          createSpy: vi.fn,
          initialState: { timeline: { items: mockItems } }
        })]
      }
    });

    // Arrange: TimelineCard is hidden by default
    expect(wrapper.findComponent({ name: 'TimelineCard'}).exists()).toBe(false);
      
    // Act: Click on card
    await wrapper.find('.card--standard').trigger('click');
    expect(wrapper.findComponent({ name: 'TimelineCard' }).exists()).toBe(true);

    // Verrify: Emit close-event to close card
    await wrapper.findComponent({ name: 'TimelineCard' }).vm.$emit('close');
    expect(wrapper.findComponent({ name: 'TimelineCard' }).exists()).toBe(false);
  });
});