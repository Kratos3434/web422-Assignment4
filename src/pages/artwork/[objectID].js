import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCarDetail";
import Head from "next/head";

export default function ArtworkById() {
    const router = useRouter();
    const { objectID } = router.query;
    return (
        <>
            <Head><title>Artwork Detail</title></Head>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    )
}