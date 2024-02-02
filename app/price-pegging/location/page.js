'use client'

import React, { memo, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import usePricePeggingHook from '@/hooks/usePricePeggingHook';


const PricePeggingLocationPage = () => {
    // http://localhost:3000/price-pegging/location?propertyPincode=424006&region=Maharashtra&zone=Dhule&location=GP%20Nardana&lat=20.882015&lng=74.765457


    const searchParams = useSearchParams()

    const [params, setParams] = useState({
        lat: 0,
        lng: 0,
    })
    const [map, setMap] = useState(null)

    const { trends, fetchPricePeggingTrends } = usePricePeggingHook()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAP_KEY
    })


    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(params);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries())
        fetchPricePeggingTrends(params)
    }, [])

    useEffect(() => {
        if (trends.length > 0) {
            setParams({
                lat: trends?.[0]?.lattitude * 1,
                lng: trends?.[0]?.longitude * 1
            })
        }
    }, [trends])

    return (trends?.data?.length && isLoaded) ? (
        <div className='map-outer-container'>
            <GoogleMap
                mapContainerClassName={"map-inner-container"}
                center={params}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {trends?.data?.[0] && trends?.data?.map((data, idx) => {
                    const center = {
                        lat: data.lattitude * 1,
                        lng: data.longitude * 1
                    }
                    return (
                        <Marker position={center} key={`marker__${idx}`}>
                            <InfoWindow onCloseClick={true} position={center}>
                                <p style={{ fontSize: ".8rem" }}>{data?.property_address}</p>
                            </InfoWindow>
                        </Marker>
                    )
                })}

            </GoogleMap>
        </div>
    ) : <>
        {trends.status === "fulfilled" && <p className='text-center mt-4'>No Data Found!</p>}
    </>
}

export default memo(PricePeggingLocationPage)