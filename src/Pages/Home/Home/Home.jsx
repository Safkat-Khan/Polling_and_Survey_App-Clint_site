import Banner from "../Banner/Banner";
import MostVoted from "../Most Voted/MostVoted";
import Section from "../Section/Section";
import Testimonial from "../Testimonials/Testimonial";




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MostVoted></MostVoted>
            <Testimonial></Testimonial>
            <Section></Section>
        
        </div>
    );
};

export default Home;