import React from 'react'
import Modal from 'react-bootstrap/Modal';
import LineCharts from '@/components/charts/LineCharts';

const PricePeggingTrendChartModel = ({ options }) => {
    const { show = false, handleClose = () => { }, title = "",
        data = []
    } = options

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
                <LineCharts data={data} />
            </Modal.Body>
        </Modal>
    )
}

export default PricePeggingTrendChartModel