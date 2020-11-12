import React, { useEffect, useRef } from 'react'

export default function Map({ options, onMount, className }) {
  const key = process.env.REACT_APP_API_KEY
  const ref = useRef()

  useEffect(() => {
    const onLoad = () => {
      const map = new window.google.maps.Map(ref.current, options)
      if (typeof onMount === `function`) onMount(map)
    }
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        key
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [onMount, options])

  return (
    <div className="map"
      style={{ height: `95vh`, width: `50%`, alignContent: `center`, borderRadius: `5px` }}
      {...{ ref, className }}
    />
  )
}

Map.defaultProps = {
  options: {
    center: { lat: 40.7128, lng: -74.0060  },
    zoom: 11,
  },
}