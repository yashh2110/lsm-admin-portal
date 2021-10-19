import React from 'react';

function CoordinatesAndColor({setColor, coord, color}) {
  return (
    <div className="in-map-form">
      <div className="">
        <p
          className="m-0"
          style={{
            fontWeight: '500',
          }}>
          Zone:
        </p>
        <div className="zonesCoord">
          {coord ? (
            coord.map(i => (
              <span className="d-flex">
                <p
                  style={{
                    width: '50px',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  {i.lat}
                </p>
                ,
                <p
                  style={{
                    margin: 0,
                    width: '50px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  {i.lng}
                </p>{' '}
              </span>
            ))
          ) : (
            <p>Draw the zone</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <p
          style={{
            fontWeight: '500',
          }}>
          Color:
        </p>
        <p>{color}</p>
        <input type="color" onChange={e => setColor(e.target.value)} />
      </div>
    </div>
  );
}

export default CoordinatesAndColor;
