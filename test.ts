
export class TestGroup {
    results: HTMLElement;
    description: string;
    constructor(descrition: string, testGroup: (testGroup: TestGroup) => void) {
        this.results = document.getElementById("results");
        this.results = <HTMLElement>this.assert(true, descrition).appendChild(document.createElement("ul"));
        // 执行回调函数
        testGroup(this);

    }

    /**
     * 使用方式 
     * new TestGroup("测试",(testGroup:TestGroup)=>{
     * testGroup.assert(true,'第一组第一个测试,一定会通过');
     * testGroup.assert(false,'第一组第二个测试,不会通过)
     * }
     *   
     * @memberOf Test
     */
    assert(value: boolean, description: string): HTMLElement {
        var li = document.createElement('li');
        li.className = value ? 'pass' : 'fail';
        li.appendChild(document.createTextNode(description));
        this.results.appendChild(li);
        if (!value) {
            var el = <HTMLDListElement>li.parentNode.parentNode;
            el.className = "fail";
        }
        return li;
    }
}

window.onload = function () {

    new TestGroup("测试结果", (testGroup: TestGroup) => {
        testGroup.assert(true, "第一组第一个测试,会通过");
        testGroup.assert(false, "第一组第二个测试,不会通过")
    });
}

