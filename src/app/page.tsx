import Banner from "./_components/Banner";
import ContactUs from "./_components/ContactUs";
import FeaturedCards from "./_components/FeaturedCards";

// app/page.tsx
export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedCards />
      <ContactUs />
    </main>
  )
}