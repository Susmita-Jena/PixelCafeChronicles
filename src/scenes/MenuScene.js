import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene')
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height
    const cx = W / 2

    // ── SKY BACKGROUND ──────────────────────────────
    const skyH = H * 0.48
    const sky = this.add.graphics()

    // sky
    sky.fillGradientStyle(0x87ceeb, 0x87ceeb, 0xb8e4a0, 0xb8e4a0, 1)
    sky.fillRect(0, 0, W, skyH)

    // ground
    sky.fillStyle(0x8ab870, 1)
    sky.fillRect(0, skyH - 8, W, 16)
    sky.fillStyle(0xc8b98a, 1)
    sky.fillRect(0, skyH + 4, W, H - skyH)

    // ── SUN ─────────────────────────────────────────
    const sun = this.add.graphics()
    sun.fillStyle(0xffe066, 1)
    sun.fillCircle(W * 0.82, H * 0.055, 26)
    sun.fillStyle(0xffe066, 0.15)
    sun.fillCircle(W * 0.82, H * 0.055, 38)

    // ── CLOUDS ──────────────────────────────────────
    this.drawCloud(80,  H * 0.04, 70, 18)
    this.drawCloud(200, H * 0.02, 50, 14)
    this.drawCloud(310, H * 0.06, 60, 16)

    // ── BACKGROUND TREES (small, far) ───────────────
    this.drawTree(30,  skyH, 18, 44, 0x4a7a30)
    this.drawTree(58,  skyH, 14, 34, 0x5a8a3a)
    this.drawTree(W - 30, skyH, 18, 44, 0x5a8a3a)
    this.drawTree(W - 58, skyH, 14, 34, 0x4a7a30)

    // ── CAFÉ BUILDING ───────────────────────────────
    const bx = cx
    const by = skyH + 2
    const bw = 260
    const bh = 140

    const b = this.add.graphics()

    // chimney
    b.fillStyle(0x7a5535, 1)
    b.fillRect(bx + 58, by - bh - 32, 16, 34)
    b.fillStyle(0x5a3a20, 1)
    b.fillRect(bx + 54, by - bh - 36, 24, 8)

    // smoke puffs
    ;[[bx+66, by-bh-44, 7, 0.25],
      [bx+62, by-bh-56, 5, 0.18],
      [bx+68, by-bh-66, 4, 0.12]
    ].forEach(([x,y,r,a]) => {
      const sg = this.add.graphics()
      sg.fillStyle(0xddccaa, a)
      sg.fillCircle(x, y, r)
    })

    // roof
    b.fillStyle(0x7a3a20, 1)
    b.fillTriangle(
      bx - bw/2 - 10, by - bh,
      bx + bw/2 + 10, by - bh,
      bx, by - bh - 70
    )
    // roof shading
    b.fillStyle(0x5a2a10, 0.3)
    b.fillTriangle(
      bx, by - bh,
      bx + bw/2 + 10, by - bh,
      bx, by - bh - 70
    )

    // roof edge
    b.fillStyle(0x5a2a10, 1)
    b.fillRect(bx - bw/2 - 12, by - bh - 4, bw + 24, 8)

    // ── AWNING ──────────────────────────────────────
    const awW = bw - 20
    const awY = by - bh + 4
    for (let i = 0; i < 13; i++) {
      b.fillStyle(i % 2 === 0 ? 0xe07890 : 0xf5deb3, 1)
      b.fillRect(bx - awW/2 + i * (awW/13), awY, awW/13 + 1, 12)
    }
    b.fillStyle(0xc05870, 1)
    b.fillRect(bx - awW/2, awY + 10, awW, 5)
    // awning scallops
    for (let i = 0; i < 8; i++) {
      b.fillStyle(0xc05870, 1)
      b.fillCircle(bx - awW/2 + 16 + i * (awW/8), awY + 16, 7)
    }

    // ── BUILDING BODY ───────────────────────────────
    // main wall — sage green like the inspo pic
    b.fillStyle(0x6b8f71, 1)
    b.fillRect(bx - bw/2, by - bh + 18, bw, bh - 18)

    // wall panel detail
    b.fillStyle(0x5a7a60, 0.4)
    b.fillRect(bx - bw/2 + 4, by - bh + 22, bw - 8, bh - 26)

    // ── SIGN ────────────────────────────────────────
    b.fillStyle(0x3a2a10, 1)
    b.fillRect(bx - 70, by - bh + 22, 140, 22)
    b.lineStyle(1.5, 0xe8c97a, 1)
    b.strokeRect(bx - 70, by - bh + 22, 140, 22)

    this.add.text(cx, by - bh + 33, '✦  PIXEL CAFÉ  ✦', {
      fontFamily: '"Press Start 2P"',
      fontSize: '7px',
      color: '#e8c97a'
    }).setOrigin(0.5)

    // ── WINDOWS ─────────────────────────────────────
    // big display window left
    this.drawShopWindow(b, bx - bw/2 + 14, by - 90, 82, 68)
    // big display window right
    this.drawShopWindow(b, bx + bw/2 - 96, by - 90, 82, 68)

    // window glow
    const glow = this.add.graphics()
    glow.fillStyle(0xffe8a0, 0.12)
    glow.fillRect(bx - bw/2 + 14, by - 90, 82, 68)
    glow.fillRect(bx + bw/2 - 96, by - 90, 82, 68)

    // ── DOOR ────────────────────────────────────────
    b.fillStyle(0x2a1a08, 1)
    b.fillRect(bx - 24, by - 58, 48, 58)
    b.fillStyle(0x3a2a10, 1)
    b.fillRect(bx - 22, by - 56, 20, 54)
    b.fillRect(bx + 2,  by - 56, 20, 54)
    // door glass panels
    b.fillStyle(0x87ceeb, 0.4)
    b.fillRect(bx - 20, by - 54, 16, 24)
    b.fillRect(bx + 4,  by - 54, 16, 24)
    // door knob
    b.fillStyle(0xe8c97a, 1)
    b.fillCircle(bx + 22, by - 30, 3)

    // ── FLOWER BOXES ────────────────────────────────
    // left window flower box
    b.fillStyle(0x7a5535, 1)
    b.fillRect(bx - bw/2 + 10, by - 28, 90, 10)
    // right window flower box
    b.fillRect(bx + bw/2 - 100, by - 28, 90, 10)

    // flowers left
    const fc = [0xe8607a, 0xf5a0b0, 0xe8c97a, 0xd4869a, 0xf0d060]
    for (let i = 0; i < 7; i++) {
      b.fillStyle(fc[i % fc.length], 1)
      b.fillCircle(bx - bw/2 + 18 + i * 12, by - 30, 5)
      b.fillStyle(0x5a8a3a, 1)
      b.fillRect(bx - bw/2 + 16 + i * 12, by - 26, 3, 6)
    }
    // flowers right
    for (let i = 0; i < 7; i++) {
      b.fillStyle(fc[(i+2) % fc.length], 1)
      b.fillCircle(bx + bw/2 - 92 + i * 12, by - 30, 5)
      b.fillStyle(0x5a8a3a, 1)
      b.fillRect(bx + bw/2 - 94 + i * 12, by - 26, 3, 6)
    }

    // ── OUTDOOR SEATING ─────────────────────────────
    // left table + chairs
    this.drawTable(b, bx - bw/2 - 30, by - 10)
    // right table + chairs
    this.drawTable(b, bx + bw/2 + 30, by - 10)

    // ── POTTED PLANTS ───────────────────────────────
    this.drawPot(b, bx - bw/2 - 8, by)
    this.drawPot(b, bx + bw/2 + 8, by)

    // ── COBBLESTONE PATH ────────────────────────────
    b.fillStyle(0xc8b098, 1)
    b.fillRect(bx - 36, by - 2, 72, 14)
    b.fillStyle(0xb09880, 0.5)
    for (let i = 0; i < 4; i++) {
      b.fillRect(bx - 34 + i * 18, by, 14, 6)
    }

    // ── TITLE BLOCK ─────────────────────────────────
    const titleY = H * 0.535

    // parchment panel
    const panel = this.add.graphics()
    panel.fillStyle(0xfdf6e3, 0.96)
    panel.fillRoundedRect(cx - 200, titleY - 18, 400, 90, 10)
    panel.lineStyle(2, 0xc9a96e, 1)
    panel.strokeRoundedRect(cx - 200, titleY - 18, 400, 90, 10)
    // inner border
    panel.lineStyle(1, 0xe8d9b5, 1)
    panel.strokeRoundedRect(cx - 194, titleY - 12, 388, 78, 8)

    this.add.text(cx, titleY + 12, 'PIXEL CAFÉ', {
      fontFamily: '"Press Start 2P"',
      fontSize: '22px',
      color: '#5c3a1e',
      stroke: '#c9a96e',
      strokeThickness: 1
    }).setOrigin(0.5)

    this.add.text(cx, titleY + 46, 'CHRONICLES', {
      fontFamily: '"Press Start 2P"',
      fontSize: '16px',
      color: '#8b6340'
    }).setOrigin(0.5)

    // tagline
    this.add.text(cx, H * 0.645, '— brew coffee  ·  build stories —', {
      fontFamily: '"Press Start 2P"',
      fontSize: '5px',
      color: '#c9a96e'
    }).setOrigin(0.5)

    // ── BUTTONS ─────────────────────────────────────
    const buttons = [
      { label: '▶   NEW GAME',  y: H * 0.72,  primary: true,  key: 'new'      },
      { label: '💾  CONTINUE',  y: H * 0.795, primary: false, key: 'continue' },
      { label: '⚙   SETTINGS', y: H * 0.87,  primary: false, key: 'settings' },
    ]

    buttons.forEach(({ label, y, primary, key }) => {
      this.makeButton(cx, y, 290, 42, label, primary, () => {
        if (key === 'new') {
          this.cameras.main.fadeOut(600, 26, 15, 0)
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameScene')
          })
        }
      })
    })

    // version
    this.add.text(cx, H * 0.945, 'v1.0  ·  made with ☕ by susmita', {
      fontFamily: '"Press Start 2P"',
      fontSize: '5px',
      color: '#c9a96e66'
    }).setOrigin(0.5)

    // fade in
    this.cameras.main.fadeIn(800, 237, 228, 204)
  }

  // ── HELPER METHODS ──────────────────────────────────

  drawCloud(x, y, w, h) {
    const g = this.add.graphics()
    g.fillStyle(0xffffff, 0.92)
    g.fillEllipse(x, y, w, h)
    g.fillEllipse(x - w * 0.28, y + 2, w * 0.6, h * 0.75)
    g.fillEllipse(x + w * 0.28, y + 2, w * 0.6, h * 0.75)
  }

  drawTree(x, baseY, w, h, color) {
    const g = this.add.graphics()
    g.fillStyle(0x7a5230, 1)
    g.fillRect(x - 3, baseY - h * 0.3, 6, h * 0.3)
    g.fillStyle(color, 1)
    g.fillTriangle(x - w/2, baseY - h*0.28, x + w/2, baseY - h*0.28, x, baseY - h)
    g.fillStyle(Phaser.Display.Color.ValueToColor(color).darken(15).color, 1)
    g.fillTriangle(x - w*0.55, baseY - h*0.5, x + w*0.55, baseY - h*0.5, x, baseY - h*1.08)
  }

  drawShopWindow(g, x, y, w, h) {
    // dark frame
    g.fillStyle(0x2a3a28, 1)
    g.fillRect(x - 3, y - 3, w + 6, h + 6)
    // glass
    g.fillStyle(0x87ceeb, 0.5)
    g.fillRect(x, y, w, h)
    // shelves inside
    g.fillStyle(0x5a3a20, 0.6)
    g.fillRect(x + 2, y + h*0.35, w - 4, 3)
    g.fillRect(x + 2, y + h*0.65, w - 4, 3)
    // items on shelves (tiny dots)
    g.fillStyle(0xe8c97a, 0.8)
    for (let i = 0; i < 4; i++) {
      g.fillRect(x + 4 + i*14, y + h*0.25, 6, 8)
      g.fillRect(x + 4 + i*14, y + h*0.52, 6, 8)
    }
    // window dividers
    g.fillStyle(0x2a3a28, 0.8)
    g.fillRect(x + w/2 - 1, y, 2, h)
    g.fillRect(x, y + h/2, w, 2)
    // reflection
    g.fillStyle(0xffffff, 0.12)
    g.fillRect(x + 2, y + 2, 10, 6)
  }

  drawTable(g, x, y) {
    // table top
    g.fillStyle(0x8b6340, 1)
    g.fillRect(x - 18, y - 20, 36, 5)
    // table legs
    g.fillStyle(0x6b4a28, 1)
    g.fillRect(x - 14, y - 15, 4, 15)
    g.fillRect(x + 10,  y - 15, 4, 15)
    // chairs
    g.fillStyle(0x7a5535, 1)
    g.fillRect(x - 28, y - 18, 10, 14)
    g.fillRect(x + 18,  y - 18, 10, 14)
    // coffee cups on table
    g.fillStyle(0xfdf6e3, 1)
    g.fillRect(x - 5, y - 22, 5, 4)
    g.fillStyle(0x8b4513, 1)
    g.fillRect(x - 4, y - 21, 3, 2)
  }

  drawPot(g, x, y) {
    // pot
    g.fillStyle(0x8b5a2b, 1)
    g.fillRect(x - 8, y - 14, 16, 14)
    // plant
    g.fillStyle(0x5a8a3a, 1)
    g.fillCircle(x, y - 18, 10)
    g.fillCircle(x - 7, y - 14, 7)
    g.fillCircle(x + 7, y - 14, 7)
  }

  makeButton(cx, y, bw, bh, label, primary, onClick) {
    const bg = this.add.graphics()

    const drawNormal = () => {
      bg.clear()
      if (primary) {
        bg.fillStyle(0x6b8f71, 1)
        bg.fillRoundedRect(cx - bw/2, y - bh/2, bw, bh, 10)
        bg.lineStyle(2, 0x3a5a3a, 1)
        bg.strokeRoundedRect(cx - bw/2, y - bh/2, bw, bh, 10)
        // shine
        bg.fillStyle(0xffffff, 0.08)
        bg.fillRoundedRect(cx - bw/2 + 4, y - bh/2 + 4, bw - 8, bh/2 - 4, 6)
      } else {
        bg.fillStyle(0xfdf6e3, 1)
        bg.fillRoundedRect(cx - bw/2, y - bh/2, bw, bh, 10)
        bg.lineStyle(1.5, 0xc9a96e, 1)
        bg.strokeRoundedRect(cx - bw/2, y - bh/2, bw, bh, 10)
      }
    }

    const drawHover = () => {
      bg.clear()
      bg.fillStyle(primary ? 0x5a7a60 : 0xf0e4c0, 1)
      bg.fillRoundedRect(cx - bw/2, y - bh/2, bw, bh, 10)
      bg.lineStyle(2, primary ? 0xe8c97a : 0x8b6340, 1)
      bg.strokeRoundedRect(cx - bw/2, y - bh/2, bw, bh, 10)
    }

    drawNormal()

    const txt = this.add.text(cx, y, label, {
      fontFamily: '"Press Start 2P"',
      fontSize: '9px',
      color: primary ? '#fdf6e3' : '#5c3a1e'
    }).setOrigin(0.5)

    const zone = this.add.zone(cx, y, bw, bh)
      .setInteractive({ useHandCursor: true })

    zone.on('pointerover', () => {
      drawHover()
      txt.setColor(primary ? '#e8c97a' : '#3a2a10')
    })
    zone.on('pointerout', () => {
      drawNormal()
      txt.setColor(primary ? '#fdf6e3' : '#5c3a1e')
    })
    zone.on('pointerdown', onClick)
  }
}