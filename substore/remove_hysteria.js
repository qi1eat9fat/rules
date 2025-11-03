function operator(proxies, targetPlatform, context) {
  return proxies.filter(proxy => {
    const type = (proxy.type || '').toLowerCase();
    const name = (proxy.name || '').toLowerCase();

    // 移除 hysteria / hysteria2 协议节点
    return !(type.includes('hysteria') || name.includes('hysteria'));
  });
}
