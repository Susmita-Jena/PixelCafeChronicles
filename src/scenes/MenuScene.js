export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // ── background ──────────────────────────────────
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a0f00);

    // ── outer decorative border ──────────────────────
    const border = this.add.graphics();
    border.lineStyle(3, 0x5c3a1e, 1);
    border.strokeRect(20, 20, W - 40, H - 40);
    border.lineStyle(1, 0x3d2b0e, 1);
    border.strokeRect(26, 26, W - 52, H - 52);

    // ── corner decorations ───────────────────────────
    const corners = [
      [36, 36], [W - 36, 36],
      [36, H - 36], [W - 36, H - 36]
    ];
    const g = this.add.graphics();
    g.fillStyle(0xc9a96e, 1);
    corners.forEach(([x, y]) => {
      g.fillRect(x - 3, y - 3, 6, 6);
    });

    // ── tiny café illustration (shapes) ─────────────
    const cx = W / 2;
    const iy = H * 0.20;

    // roof
    const roof = this.add.graphics();
    roof.fillStyle(0x5c3a1e, 1);
    roof.fillTriangle(cx - 60, iy, cx + 60, iy, cx, iy - 36);
    roof.fillStyle(0x3d2b0e, 1);
    roof.fillRect(cx - 44, iy - 8, 88, 12);

    // house body
    roof.fillStyle(0x2d1b00, 1);
    roof.fillRect(cx - 44, iy, 88, 52);

    // door
    roof.fillStyle(0x5c3a1e, 1);
    roof.fillRect(cx - 10, iy + 26, 20, 26);

    // windows
    roof.fillStyle(0xe8c97a, 0.6);
    roof.fillRect(cx - 36, iy + 14, 16, 14);
    roof.fillRect(cx + 20, iy + 14, 16, 14);

    // chimney
    roof.fillStyle(0x5c3a1e, 1);
    roof.fillRect(cx + 22, iy - 28, 10, 20);

    // smoke puffs
    const smoke = this.add.graphics();
    smoke.fillStyle(0xc9a96e, 0.25);
    smoke.fillCircle(cx + 27, iy - 34, 5);
    smoke.fillCircle(cx + 24, iy - 42, 4);
    smoke.fillCircle(cx + 28, iy - 50, 3);

    // awning stripes
    roof.fillStyle(0xd4869a, 1);
    for (let i = 0; i < 5; i++) {
      roof.fillRect(cx - 44 + i * 18, iy - 1, 9, 6);
    }

    // sign
    roof.fillStyle(0x5c3a1e, 1);
    roof.fillRect(cx - 28, iy + 6, 56, 14);
    this.add.text(cx, iy + 13, 'CAFÉ', {
      fontFamily: '"Press Start 2P"',
      fontSize: '6px',
      color: '#e8c97a'
    }).setOrigin(0.5);

    // ── title ────────────────────────────────────────
    this.add.text(cx, H * 0.46, 'PIXEL CAFÉ', {
      fontFamily: '"Press Start 2P"',
      fontSize: '26px',
      color: '#f5deb3'
    }).setOrigin(0.5);

    this.add.text(cx, H * 0.56, 'CHRONICLES', {
      fontFamily: '"Press Start 2P"',
      fontSize: '26px',
      color: '#c9a96e'
    }).setOrigin(0.5);

    this.add.text(cx, H * 0.63, 'brew coffee  ·  build stories', {
      fontFamily: '"Press Start 2P"',
      fontSize: '7px',
      color: '#5c3a1e'
    }).setOrigin(0.5);

    // ── menu buttons ─────────────────────────────────
    const buttons = [
      { label: '▶  New Game', y: H * 0.735, key: 'new' },
      { label: '⚙  Settings', y: H * 0.835, key: 'settings' },
    ];

    buttons.forEach(({ label, y, key }) => {
      const btnW = 220;
      const btnH = 30;

      // button bg
      const bg = this.add.graphics();
      bg.fillStyle(0x2d1b00, 1);
      bg.fillRect(cx - btnW / 2, y - btnH / 2, btnW, btnH);
      bg.lineStyle(1.5, 0x5c3a1e, 1);
      bg.strokeRect(cx - btnW / 2, y - btnH / 2, btnW, btnH);

      // button text
      const txt = this.add.text(cx, y, label, {
        fontFamily: '"Press Start 2P"',
        fontSize: '9px',
        color: '#f5deb3'
      }).setOrigin(0.5);

      // hitbox
      const zone = this.add.zone(cx, y, btnW, btnH).setInteractive({ useHandCursor: true });

      zone.on('pointerover', () => {
        bg.clear();
        bg.fillStyle(0x5c3a1e, 1);
        bg.fillRect(cx - btnW / 2, y - btnH / 2, btnW, btnH);
        bg.lineStyle(1.5, 0xc9a96e, 1);
        bg.strokeRect(cx - btnW / 2, y - btnH / 2, btnW, btnH);
        txt.setColor('#e8c97a');
      });

      zone.on('pointerout', () => {
        bg.clear();
        bg.fillStyle(0x2d1b00, 1);
        bg.fillRect(cx - btnW / 2, y - btnH / 2, btnW, btnH);
        bg.lineStyle(1.5, 0x5c3a1e, 1);
        bg.strokeRect(cx - btnW / 2, y - btnH / 2, btnW, btnH);
        txt.setColor('#f5deb3');
      });

      zone.on('pointerdown', () => {
        if (key === 'new') {
          this.cameras.main.fadeOut(500, 26, 15, 0);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameScene');
          });
        }
      });
    });

    // ── version ──────────────────────────────────────
    this.add.text(W - 30, H - 20, 'v1.0', {
      fontFamily: '"Press Start 2P"',
      fontSize: '5px',
      color: '#3d2b0e'
    }).setOrigin(0.5);

    // ── fade in ──────────────────────────────────────
    this.cameras.main.fadeIn(800, 26, 15, 0);
  }
}