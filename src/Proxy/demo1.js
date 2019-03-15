var obj = { name: 'sumaolin' };
var w = new Proxy(obj, {
    get: function (target, property, value) {
        console.log(target);
        console.log(property);
        return value; // 返回后 才已访问到对应属性的值，否则代理实例无法获取属性值
    }
});
console.log(obj.name);
console.log(w);
