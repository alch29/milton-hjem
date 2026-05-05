import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Calendar from '../Calendar.vue';

describe('Calendar', () => {
  it('shows correct name of month', () => {
    const wrapper = mount(Calendar, {
      global: { 
        plugins: [createTestingPinia({ createSpy: vi.fn })] 
      }
    });
        
    // Arrange: Current month
    const today = new Date();
    const currentMonth = today.toLocaleDateString('da-DK', { month: 'long', year: 'numeric' });
        
    // Assert: verrify the current month is also the month name in the calendar
    expect(wrapper.find('.calendar__month-name').text()).toContain(currentMonth);
  });

  it('navigate to next month and back to current month', async () => {
    const wrapper = mount(Calendar, {
      global: { 
        plugins: [createTestingPinia({ createSpy: vi.fn })] 
      }
    });
        
    // Arrange: Find current month
    const currentMonth = wrapper.find('.calendar__month-name').text();
      
    // Act and assert: Go to next month and verrify it isn't the same as the current
    await wrapper.findAll('button')[1].trigger('click');
    const nextMonth = wrapper.find('.calendar__month-name').text();
    expect(nextMonth).not.toBe(currentMonth);
      
    // Act and assert: Go back and verrify it is the current month again
    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.find('.calendar__month-name').text()).toBe(currentMonth);
  });
});