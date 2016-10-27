import { TestGroup } from './test';
new TestGroup(document.getElementById('results'), '测试组A', (testGroup) => {
    testGroup.assert(true, 'pass');
    testGroup.assert(false, 'fail');
});