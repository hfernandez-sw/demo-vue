import { expect } from 'chai';
import sinon from 'sinon';
import Factory from '@factory';

import SectionMessage from '@/components/common/SectionMessage';
import Login from '@/views/Login';

const testFactory = new Factory(Login, {
  data() {
    return {
      loginField: '',
      password: '',
      remember_login_check: false,
      errors: []
    };
  }
});
let wrapper = testFactory.shallowMount();
wrapper = testFactory.destroy();

describe('Login.vue', () => {
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
    it('Render SectionMessage', async () => {
      await wrapper.setData({ errors: ['Error login'] });
      expect(wrapper.findComponent(SectionMessage).exists()).to.deep.equal(true);
    });
    it('Render SectionMessage with props', async () => {
      await wrapper.setData({ errors: ['Error login'] });
      const sectionMsg = wrapper.findComponent(SectionMessage);
      expect(sectionMsg.props()).to.include({
        type: 'danger',
        titleMessage: 'Unable to login',
        textMessage: 'Error login'
      });
    });
  });
  describe('Methods', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });
    after(() => {
      wrapper = testFactory.destroy();
    });

    it('processForm is a function', () => {
      expect(wrapper.vm.processForm).to.be.a('function');
    });
    it('setDefaultToken is a function', () => {
      expect(wrapper.vm.setDefaultToken).to.be.a('function');
    });
    it('decodeToken is a function', () => {
      expect(wrapper.vm.decodeToken).to.be.a('function');
    });
    it('rememberClick is a function', () => {
      expect(wrapper.vm.rememberClick).to.be.a('function');
    });

    it('login action need to be fired on processForm', async () => {
      const loginStub = sinon.stub();
      loginStub.returns({
        user: 'SAMPLE',
        token: 'TOKEN'
      });
      const newStore = {
        actions: {
          login: loginStub
        }
      };
      const newWrapper = await testFactory.updateStore({ store: newStore });
      const forceSetDefaultToken = (newWrapper.vm.setDefaultToken = sinon.stub());
      await newWrapper.vm.processForm();
      expect(loginStub.called).to.deep.equal(true);
    });
  });
});
