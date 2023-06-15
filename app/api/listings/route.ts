import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentuser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentuser();

  // check if there is no current user
  if (!currentUser) {
    return NextResponse.error();
  }

  // lets extract the body
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // we are going to iterate over all of them to know if any of them is missing because all of them are required.
  // WE CAN ACTUALLY REMOVE THIS BLOCK OF CODE AS ITS NOT NEEDED
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      /**if any partof the array is missing in the body return error */
      NextResponse.error();
    }
  });

  //  Now we have to craete the listing
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10) /**to make sure our price is an integer */,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
