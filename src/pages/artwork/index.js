import ArtworkCard from "@/components/ArtworkCard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from 'swr';
import Error from "next/error";
import { Row, Col, Pagination } from "react-bootstrap";
import Head from "next/head";

const PER_PAGE = 12;

export default function ArtWork() {
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    const previousPage = () => {
        if (page > 1) setPage(page - 1);
    }

    const nextPage = () => {
        if (page < artworkList.length) setPage(page + 1);
    }

    const loadResults = () => {
        if (data) {
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
        }
    }

    useEffect(() => {
        loadResults();
    }, [data]);

    if (error) {
        return <Error statusCode={404} />;
    }
    else if (data) {
        return (
            (artworkList) ?
                (
                    <>
                        <Head><title>Artwork</title></Head>
                        <Row className="gy-4">
                            {
                                (artworkList.length > 0) ?
                                    (
                                            artworkList[page-1].map(e=>{
                                                return <Col lg={3} key={e}><ArtworkCard objectID={e} /></Col>
                                            })
                                    ) : (
                                        <>
                                            <h4>Nothing Here</h4> Try searching for something else
                                        </>
                                    )
                            }
                        </Row>
                        {
                            (artworkList.length > 0) ?
                                (
                                    <Row>
                                        <Col>
                                            <br />
                                            <Pagination>
                                                <Pagination.Prev onClick={previousPage} />
                                                <Pagination.Item>{page}</Pagination.Item>
                                                <Pagination.Next onClick={nextPage} />
                                            </Pagination>
                                        </Col>
                                    </Row>
                                ) : (<></>)
                        }
                    </>
                ) : (<></>)
        )
    }
}