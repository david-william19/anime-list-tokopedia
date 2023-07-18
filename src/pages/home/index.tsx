import AnimeList from "../../components/AnimeList/Lists";
import Banner from "../../components/Banner";
import Layout from "../../components/Layout";

export function Home() {
    return(
        <Layout>
            <Banner description="Hello Guys,<br />
                Find your anime here and create <br />
                a collections &#129321;" />
            <AnimeList />
        </Layout>
    )
}