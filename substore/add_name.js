/**
 * Sub-Store Script: Add Prefix to Node Name
 * * @param {object[]} proxies - 节点列表
 * @param {object} $arguments - 外部传入的参数
 */
function operator(proxies) {
  // 1. 获取参数中的名称 (name) 和 分隔符 (sep)
  // 如果没有传入 name，则不修改
  const prefix = $arguments.name;
  const separator = $arguments.sep || " | "; // 默认分隔符为 " | "

  if (!prefix) {
    console.log("⚠️ 未检测到 name 参数，跳过重命名。");
    return proxies;
  }

  // 2. 遍历并修改节点名称
  return proxies.map(proxy => {
    // 检查是否已经包含该前缀（防止重复添加）
    if (!proxy.name.startsWith(prefix)) {
      proxy.name = `${prefix}${separator}${proxy.name}`;
    }
    return proxy;
  });
}
