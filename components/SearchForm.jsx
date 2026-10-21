/***************************************************************************
 * ITE5425 - Mastery Assignment 1: Art Explorer
 * I declare that this assignment is my own work in accordance with Humber
 * Academic Policy. No part of this assignment has been copied manually or
 * electronically from any other source, including websites, or distributed
 * to other students.
 *
 * I understand that I may use Generative AI for learning, debugging, and
 * brainstorming, but the submitted work must be customized to this Art
 * Explorer assignment and I must be able to explain the code and design decisions.
 *
 * Name: Yung-Lun Lee  Student ID: N01721599  Date: 2026.10.21
 ***************************************************************************/

"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submit(data) {
    const keyword = data.keyword.trim();

    const params = new URLSearchParams();
    params.set("q", keyword);

    if (data.titleOnly) {
      params.set("title", "true");
    }

    router.push(`/artwork?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label htmlFor="keyword">Keyword</label>

      <input
        id="keyword"
        className="field"
        {...register("keyword", {
          required: "Keyword required",
          validate: (value) =>
            value.trim().length >= 3 ||
            "Keyword must be at least 3 characters",
        })}
      />

      {errors.keyword && (
        <p className="error">{errors.keyword.message}</p>
      )}

      <label>
        <input
          type="checkbox"
          {...register("titleOnly")}
        />
        Search title only
      </label>

      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}
