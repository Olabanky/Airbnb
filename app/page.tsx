import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./commponents/ClientOnly";
import Container from "./commponents/Container";
import EmptyState from "./commponents/EmptyState";
import ListingCard from "./commponents/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

// since Home is a server component, we will need to create an API call for the listings. we created getListings.ts
const Home = async ({ searchParams }: HomeProps) => {
  // we have to create an empty state should a user select a listing that is not available in our database

  const listings = await getListings(searchParams);
  // get current user
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      // we are qwrapping in clientonly so there wont be dehydration error
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
