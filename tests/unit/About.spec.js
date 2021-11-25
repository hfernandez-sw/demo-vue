import { expect } from 'chai';
import Factory from '@factory';

import About from '@/views/About';

const testFactory = new Factory(About);
let wrapper = testFactory.shallowMount();
wrapper = testFactory.destroy();

describe('About.vue', () => {
  describe('Render', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });
    after(() => {
      wrapper = testFactory.destroy();
    });
    it('Render main DIV', () => {
      expect(wrapper.find('div').exists()).to.deep.equal(true);
    });
    it('Render main DIV with clasess', () => {
      const mainDiv = wrapper.find('div');
      expect(mainDiv.classes()).to.deep.equal(['about']);
    });
    it('Render main h1', () => {
      expect(wrapper.find('h1').exists()).to.deep.equal(true);
    });
    it('Render the title', () => {
      const h1 = wrapper.find('h1');
      expect(h1.text()).to.deep.equal('This is an about sample page');
    });
  });
  describe('Computed', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });
    after(() => {
      wrapper = testFactory.destroy();
    });
    it('fullTitle return text with the full text', async () => {
      await wrapper.setData({
        title: 'demo'
      });

      expect(wrapper.vm.fullTitle).to.deep.equal('demo page');
    });
  });
});
