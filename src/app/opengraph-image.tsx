import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Barakah Quest - Spiritual Habit Tracker';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            border: '4px solid black',
            borderRadius: '20px',
            backgroundColor: '#fff',
            boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div style={{ fontSize: 80, fontWeight: 900, color: 'black', fontFamily: 'serif' }}>
              Barakah Quest
            </div>
            <div style={{ fontSize: 32, color: '#666', fontWeight: 600 }}>
              Nurture your daily habits
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
