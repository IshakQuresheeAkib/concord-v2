import Banner from "./_components/Banner";
import ContactUs from "./_components/ContactUs";
import FeaturedCards from "./_components/FeaturedCards";

// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
       <div>
             <Banner></Banner>
             <FeaturedCards></FeaturedCards>
             <div className="mt-24"><ContactUs></ContactUs></div>
        </div>
    </main>
  )
}