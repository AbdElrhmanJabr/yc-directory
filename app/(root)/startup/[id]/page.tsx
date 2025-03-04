import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  
  const id = (await params).id;
  
  const [post, { select: bestStartups }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "best-startups",
    }),
  ]);
  if (!post) return notFound();
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl ">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto - rounded-xl"
        />
        <div className="space-y-5 mt-5 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <p className="text-20-medium">{post.author.name}</p>
              <p className="text-16-medium !text-black-300">
                {post.author.username}
              </p>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {post?.pitch ? (
            <article className="prose max-w-4xl font-work-sans break-all">
              {post?.pitch}
            </article>
          ) : (
            <p className="no-result">No Details</p>
          )}
        </div>
        <hr className="divider" />

        {bestStartups?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Best Startups</p>

            <ul className="mt-7 card_grid-sm">
              {bestStartups.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
