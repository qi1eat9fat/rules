// 1. 解析传入的完整配置文件 ($content)
let config = ProxyUtils.yaml.safeLoad($content);

// 2. 定义要追加的节点
const dnsNode = {
  name: "🚫DNS拦截",
  type: "dns"
};

// 3. 提取并追加 proxies
if (!config.proxies) config.proxies = [];
config.proxies.push(dnsNode);

// 4. 重组对象顺序：确保 proxies 在 dns 后面
const newConfig = {};
const keys = Object.keys(config);
const processedKeys = new Set();

if (config.dns) {
  for (const key of keys) {
    if (key === 'proxies') continue;
    newConfig[key] = config[key];
    processedKeys.add(key);
    if (key === 'dns') {
      newConfig['proxies'] = config['proxies'];
      processedKeys.add('proxies');
    }
  }
} else {
  Object.assign(newConfig, config);
}

for (const key of keys) {
  if (!processedKeys.has(key)) {
    newConfig[key] = config[key];
  }
}

// 5. 生成 YAML 字符串
let yamlString = ProxyUtils.yaml.dump(newConfig);

// =========================================================
// 修复：Emoji 反转义 (解决 \U0001F1ED\U0001F1F0 显示问题)
// =========================================================
// 处理 8位 Unicode (\Uxxxxxxxx)
yamlString = yamlString.replace(/\\U([0-9a-fA-F]{8})/g, (match, grp) => {
  return String.fromCodePoint(parseInt(grp, 16));
});
// 处理 4位 Unicode (\uxxxx)
yamlString = yamlString.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
  return String.fromCharCode(parseInt(grp, 16));
});

// 7. 输出最终结果
$content = yamlString;
