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
    // 检查是否满足条件：_subName为"qi"且名称包含"落地"
    if (proxy._subName === "qi" && proxy.name.includes("落地")) {
      // 找出第一个匹配的地区关键字
      for (const [keyword, dialerName] of Object.entries(regionMap)) {
        if (proxy.name.includes(keyword)) {
          // 命中条件，设置 dialer-proxy
          return { 
            ...proxy, 
            "dialer-proxy": dialerName 
          };
        }
      }
    }
    
    // 未命中条件则返回原对象
    return proxy;
  });
}
