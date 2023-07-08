import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    useEffect(()=>{

    },[data])
    if (error) {
        return <Error statusCode={404} />;
    }
    else if (data) {
        return (
            <Card style={{ width: '18rem' }}>
                {data.primaryImageSmall ? <Card.Img variant="top" src={data.primaryImageSmall}/> : 
                <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"/>}
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong> {(data.objectDate) ? (data.objectDate) : ("N/A")} <br />
                        <strong>Classification: </strong> {(data.classification) ? (data.classification) : ("N/A")} <br />
                        <strong>Medium: </strong> {(data.medium) ? (data.medium) : ("N/A")} <br />
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref><Button variant="primary">{objectID}</Button></Link>
                </Card.Body>
            </Card>
        )
    }
    else {
        return null;
    }
}