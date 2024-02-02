import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';


const DSALocationModel = ({ options }) => {

    const { show = false, handleClose = () => { }, title = "Map", data = {} } = options
    const { lat = 0, lng = 0, address = "" } = data

    const [map, setMap] = React.useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY
    })

    const onLoad = React.useCallback(function callback(map) {
        if (lat && lng) {
            const bounds = new window.google.maps.LatLngBounds({ lat, lng });
            map.fitBounds(bounds);
            setMap(map)
        }
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <Modal show={show} onHide={handleClose} animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoaded ? (
                    <div className='map-outer-container max-height-600px'>
                        <GoogleMap
                            mapContainerClassName={"map-inner-container"}
                            center={{ lat, lng }}
                            zoom={12}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            {(lat && lng) &&
                                <Marker position={{ lat, lng }}>
                                    <InfoWindow position={{ lat, lng }} onCloseClick={true}>
                                        <p>{address || ""}</p>
                                    </InfoWindow>
                                </Marker>}
                        </GoogleMap>
                    </div>
                ) : <></>}
            </Modal.Body>
        </Modal>
    )
}

export default DSALocationModel