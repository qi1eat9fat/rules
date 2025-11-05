function operator(proxies, targetPlatform, context) {
  // 定义关键字与对应 dialer-proxy 的映射表
  const regionMap = {
    "日本": "日本节点",
    "香港": "香港节点",
    "台湾": "香港节点",
    "新加坡": "香港节点",
    "美国": "日本节点"
  };

  return proxies.map(proxy => {
    // 找出代理名称中包含的地区关键字
    for (const [keyword, dialerName] of Object.entries(regionMap)) {
      if (proxy.name.includes(keyword)) {
        // 命中地区关键字并且包含 "qi" 和 "落地" 才设置 dialer-proxy
        if (proxy._subName=="qi" && proxy.name.includes("落地")) {
          return { ...proxy, "dialer-proxy": dialerName };
        }
      }
    }
    // 未命中则返回原对象
    return proxy;
  });
}
