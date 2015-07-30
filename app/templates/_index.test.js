import sinon from 'sinon';
import { expect } from 'chai';
import <%= camelModuleName %> from './../src/index';

describe('<%= camelModuleName %>', () => {
  let sandbox;

  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should <%= camelModuleName %>', () => expect(<%= camelModuleName %>('unicorns')).to.equal('unicorns'));
});
