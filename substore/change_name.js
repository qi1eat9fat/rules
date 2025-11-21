function operator(proxies, targetPlatform, context) {
  // 初始化一个序号计数器，从 1 开始
  let counter = 1;
  // 使用 map 方法遍历每一个代理对象
  return proxies.map(proxy => {
    // 将数字序号格式化为两位数的字符串，例如 1 -> "01", 10 -> "10"
    // String(counter) 将数字转为字符串
    // .padStart(2, '0') 表示目标长度为2，如果不足，在开头用'0'填充
    const formattedCounter = String(counter).padStart(2, '0');
    // 构建新的代理名称
    const newName = `美国家宽${formattedCounter} 赞助`;
    // 序号自增
    counter++;
    // 返回带有新名称的代理对象
    return { ...proxy, name: newName };
  });
}
