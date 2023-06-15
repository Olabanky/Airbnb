"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { format } from "date-fns"; /**npm install date-fns */
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  // handle cancel: this wiill be use in trips reservations and other types of listing card
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      // check if the current card is disabled
      if (disabled) {
        return;
      }
      // else
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      /**if we have a reservation, then we return the reservation price */
      return reservation.totalPrice;
    }
    // otherwise
    return data.price;
  }, [reservation, data.price]);

  //   reservation date will handle the listing booking dates..like from when to when a listing is booked for
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    // else
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    // npm install date-fns
    return `${format(start, "PP")} - ${format(
      end,
      "PP"
    )}`; /**PP creates the look of the date that we want */
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className=" aspect-square w-full relative overflow-hidden founded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
            object-cover
            h-full
            w-full
            group-hover:scale-110 /**/
            transition
          "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {/* this will render our reservations if it exist otherwise it will show category of the listing*/}

          {reservationDate || data.category}
        </div>
        <div className="flex flex-row item-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
