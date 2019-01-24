interface pointer2d {
  x: number
  y: number
}

interface pointer3d extends pointer2d {
  z: number
}

function getMianji({ x = 1, y = 1 }: pointer2d): void {
  // 获取面积
}

function getTiji({  }: pointer3d): void {
  // 获取体积
}
