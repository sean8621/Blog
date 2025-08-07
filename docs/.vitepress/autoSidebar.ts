import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "../articles");

// 需要排除的文件夹
const excludeDirs = ["assets", "components","interview-article"];
function getSidebar(dir = root) {
  const sidebar: any[] = [];
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (excludeDirs.includes(file)) return; // 排除指定文件夹
      sidebar.push({
        text: file,
        items: getSidebar(fullPath),
      });
    } else if (stat.isFile() && file.endsWith(".md")) {
      sidebar.push({
        text: file.replace(/\.md$/, ""),
        link:
          "/articles" +
          fullPath.replace(root, "").replace(/\\/g, "/").replace(/\.md$/, ""),
      });
    }
  });

  return sidebar;
}

export default function () {
  return {
    "/articles/": getSidebar(),
  };
}
