import { ImageResponse } from 'next/og';

// Dynamically generated Open Graph / social preview image for the site root.
export const alt = 'Vitrine — Headless WordPress + React';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '80px',
          background: '#070a14',
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(147,51,234,0.45), transparent 45%), radial-gradient(circle at 10% 95%, rgba(91,83,240,0.4), transparent 40%)',
          color: '#f3f5fb',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>Vitrine</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '84px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              maxWidth: '900px',
            }}
          >
            Selected work, served headless.
          </div>
          <div style={{ marginTop: '28px', fontSize: '30px', color: '#8b93a7' }}>
            A headless WordPress + React reference.
          </div>
        </div>

        <div style={{ fontSize: '24px', color: '#8b93a7' }}>github.com/lukecarva/vitrine</div>
      </div>
    ),
    { ...size },
  );
}
