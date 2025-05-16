import React, { useState, useEffect } from "react";

const photos = [
  { id: 3, src: "/photos/childhood/Childhood_0yrs.jpg", title: "From bump to now — his story begins", year: 1997, tags: ["childhood"] },
  { id: 5, src: "/photos/childhood/Childhood_2months.jpg", title: "2 months of giggles", year: 1998, tags: ["childhood"] },
  { id: 7, src: "/photos/childhood/Childhood_3months.jpg", title: "3 months old & curious", year: 1998, tags: ["childhood"] },
  { id: 12, src: "/photos/childhood/Childhood_5_months.jpg", title: "Chubby at 5 months", year: 1998, tags: ["childhood"] },
  { id: 25, src: "/photos/childhood/Childhood_11days.jpg", title: "Just 11 days young", year: 1998, tags: ["childhood"] },
  { id: 26, src: "/photos/childhood/Childhood_20days.jpg", title: "20-day-old wonder", year: 1998, tags: ["childhood"] },
  { id: 27, src: "/photos/childhood/Childhood_21_days.jpg", title: "Tiny at 21 days", year: 1998, tags: ["childhood"] },
  { id: 4, src: "/photos/childhood/Childhood_1year_first_tumble.jpg", title: "First tumble at 1", year: 1999, tags: ["childhood"] },
  { id: 6, src: "/photos/childhood/Childhood_2yrs_aquarium.jpg", title: "Fishy fun at 2", year: 2000, tags: ["childhood"] },
  { id: 8, src: "/photos/childhood/Childhood_3yrs_Birthday.jpg", title: "Turning 3 with cake!", year: 2001, tags: ["childhood"] },
  { id: 9, src: "/photos/childhood/Childhood_4th_bday.jpg", title: "Fourth birthday joy", year: 2002, tags: ["childhood"] },
  { id: 10, src: "/photos/childhood/Childhood_4th_birthday.jpg", title: "Big 4 birthday", year: 2002, tags: ["childhood"] },
  { id: 11, src: "/photos/childhood/Childhood_4yrs_in_the_pooja_room_photoshoot.jpg", title: "Pooja room poses", year: 2002, tags: ["childhood"] },
  { id: 13, src: "/photos/childhood/Childhood_5th_Birthday_2.jpg", title: "5th birthday bash", year: 2003, tags: ["childhood"] },
  { id: 14, src: "/photos/childhood/Childhood_5th_Birthday.jpg", title: "Five and fabulous", year: 2003, tags: ["childhood"] },
  { id: 15, src: "/photos/childhood/Childhood_5years_TungabhadraDamVisit.jpg", title: "Dam visit at 5", year: 2003, tags: ["childhood"] },
  { id: 16, src: "/photos/childhood/Childhood_5yrs.jpg", title: "Age 5 adventures", year: 2003, tags: ["childhood"] },
  { id: 17, src: "/photos/childhood/Childhood_6th_birthday_party.jpg", title: "6th birthday party time", year: 2004, tags: ["childhood"] },
  { id: 18, src: "/photos/childhood/Childhood_7th_birday_cutting_cake_with_mom_and_dad.jpg", title: "Cake with mom & dad", year: 2005, tags: ["childhood"] },
  { id: 19, src: "/photos/childhood/Childhood_7year_old_posing_cutely.jpg", title: "7 and striking a pose", year: 2005, tags: ["childhood"] },
  { id: 20, src: "/photos/childhood/Childhood_7years.jpg", title: "7-year-old sunshine", year: 2005, tags: ["childhood"] },
  { id: 21, src: "/photos/childhood/Childhood_8thbday_cutting_cake.jpg", title: "8th birthday cake cut", year: 2006, tags: ["childhood"] },
  { id: 22, src: "/photos/childhood/Childhood_8years.jpg", title: "Age 8 and glowing", year: 2006, tags: ["childhood"] },
  { id: 23, src: "/photos/childhood/Childhood_8yrs_posing_with_a_bike.jpg", title: "Bike buddy at 8", year: 2006, tags: ["childhood"] },
  { id: 24, src: "/photos/childhood/Childhood_10th_bday.jpg", title: "Big 1-0 celebration", year: 2008, tags: ["childhood"] },

  // The rest (no age detected)
  { id: 1, src: "/photos/childhood/Chidhood_suraj_with_mom_and_vitesh_at_the_temple.jpg", title: "Temple time with family", year: "", tags: ["childhood"] },
  { id: 2, src: "/photos/childhood/Child_winning_coloring_competition.jpg", title: "Coloring champ!", year: "", tags: ["childhood"] },
  { id: 28, src: "/photos/childhood/Childhood_bald_suraj.jpg", title: "Bald & beautiful", year: "", tags: ["childhood"] },
  { id: 29, src: "/photos/childhood/Childhood_Chef_Suraj.jpg", title: "Little Chef Suraj", year: "", tags: ["childhood"] },
  { id: 30, src: "/photos/childhood/Childhood_chubby_suraj.jpg", title: "Chubby cheeks alert!", year: "", tags: ["childhood"] },
  { id: 31, src: "/photos/childhood/Childhood_in_the_bath_tub.jpg", title: "Tub time!", year: "", tags: ["childhood"] },
  { id: 32, src: "/photos/childhood/Childhood_model_suraj.jpg", title: "Model mode on", year: "", tags: ["childhood"] },
  { id: 33, src: "/photos/childhood/Childhood_mom_dad_me.jpg", title: "With mom & dad", year: "", tags: ["childhood"] },
  { id: 34, src: "/photos/childhood/Childhood_Nanamma_Thata.jpg", title: "With Nanamma & Thata", year: "", tags: ["childhood"] },
  { id: 35, src: "/photos/childhood/Childhood_Nanammas_prince.jpg", title: "Nanamma’s prince", year: "", tags: ["childhood"] },
  { id: 36, src: "/photos/childhood/Childhood_peekaboo.jpg", title: "Peekaboo!", year: "", tags: ["childhood"] },
  { id: 37, src: "/photos/childhood/Childhood_poser_with_hand_on_cheek.jpg", title: "Poser mode on", year: "", tags: ["childhood"] },
  { id: 38, src: "/photos/childhood/Childhood_posing_next_to_a_plant.jpg", title: "Plant pal", year: "", tags: ["childhood"] },
  { id: 39, src: "/photos/childhood/Childhood_pretedning_to_drive_a_car.jpg", title: "Driving dreams", year: "", tags: ["childhood"] },
  { id: 40, src: "/photos/childhood/Childhood_sitting_in_a_shelf.jpg", title: "Shelf surprise", year: "", tags: ["childhood"] },
  { id: 41, src: "/photos/childhood/Childhood_sitting_on_an_inflated_throne_like_a_king.jpg", title: "Inflatable throne king", year: "", tags: ["childhood"] },
  { id: 42, src: "/photos/childhood/Childhood_Sreekanth_mamas_house_warming_family_photo.jpg", title: "Housewarming memories", year: "", tags: ["childhood"] },
  { id: 43, src: "/photos/childhood/Childhood_Sreekanth_mamas_wedding_family_photo.jpg", title: "Wedding day smiles", year: "", tags: ["childhood"] },
  { id: 44, src: "/photos/childhood/Childhood_stage_performance_spot_him.jpg", title: "Spot him on stage", year: "", tags: ["childhood"] },
  { id: 45, src: "/photos/childhood/Childhood_suraj_and_mom.jpg", title: "Cuddles with mom", year: "", tags: ["childhood"] },
  { id: 46, src: "/photos/childhood/Childhood_Suraj_choose_money_when_presented_with_different_items.jpg", title: "Chose money, of course!", year: "", tags: ["childhood"] },
  { id: 47, src: "/photos/childhood/Childhood_suraj_hugging_mom.jpg", title: "Mom hug master", year: "", tags: ["childhood"] },
  { id: 48, src: "/photos/childhood/Childhood_Suraj_in_a_hat.jpg", title: "Hat-tastic Suraj", year: "", tags: ["childhood"] },
  { id: 49, src: "/photos/childhood/Childhood_suraj_in_the_rain.jpg", title: "Rainy day joy", year: "", tags: ["childhood"] },
  { id: 50, src: "/photos/childhood/Childhood_Suraj_mom.jpg", title: "Suraj & mom love", year: "", tags: ["childhood"] },
  { id: 51, src: "/photos/childhood/Childhood_suraj_pretending_to_make_a_call.jpg", title: "Hello, it's Suraj!", year: "", tags: ["childhood"] },
  { id: 52, src: "/photos/childhood/Childhood_Suraj_with_meena_atha.jpg", title: "With Meena atha", year: "", tags: ["childhood"] },
  { id: 53, src: "/photos/childhood/Childhood_Tibetian_Suraj.jpg", title: "Tibetan vibes", year: "", tags: ["childhood"] },
  { id: 54, src: "/photos/childhood/Suraj_dressed_as_shankaracharya.jpg", title: "Mini Shankaracharya", year: "", tags: ["childhood"] },
  { id: 55, src: "/photos/childhood/Suraj_smiling_with_full_teeth.jpg", title: "Full-teeth smile!", year: "", tags: ["childhood"] },
];




export default function GalleryApp() {
  const [filter, setFilter] = useState("all");
  const [slideshowIndex, setSlideshowIndex] = useState(null);

  const filteredPhotos =
    filter === "all"
      ? photos
      : photos.filter(
          (photo) =>
            photo.tags.includes(filter) || photo.year.toString() === filter
        );

  // Slideshow effect
  useEffect(() => {
    if (slideshowIndex === null) return;
    const id = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % filteredPhotos.length);
    }, 3000);
    return () => clearInterval(id);
  }, [slideshowIndex, filteredPhotos]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <h2 style={{ margin: 0, color: "#0ff" }}>Photo Gallery</h2>

        <label style={{ marginRight: 8 }}>Filter by year/tag:</label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          style={{ padding: 4 }}
        >
          <option value="all">All</option>
          <option value="childhood">Childhood</option>
          <option value="undergrad">Undergrad</option>
          <option value="masters">Master's</option>
          <option value="wedding">Wedding</option>
      
        </select>
      </div>

      {/* Show thumbnails grid only when slideshow NOT active */}
      {slideshowIndex === null && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            overflow: "auto",
            flexGrow: 1,
          }}
        >
          {filteredPhotos.map((photo, i) => (
            <img
              key={photo.id}
              src={photo.src}
              alt={photo.title}
              width={100}
              height={70}
              style={{
                cursor: "pointer",
                border: slideshowIndex === i ? "3px solid #00f" : "1px solid #555",
                borderRadius: 4,
              }}
              onClick={() => setSlideshowIndex(i)}
            />
          ))}
        </div>
      )}

      {/* Slideshow view when slideshowIndex is set */}
      {slideshowIndex !== null && (
        <div
          style={{
            // height: "100vh",              // full viewport height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",    // center vertically
            alignItems: "center",
            padding: 0,
            boxSizing: "border-box",
            overflow: "hidden",          // hide overflow so no scrollbar
          }}
        >
          <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            margin: 0,
            padding: 0,            // <-- REMOVE padding
          }}
          >
          <img
          src={filteredPhotos[slideshowIndex].src}
          alt={filteredPhotos[slideshowIndex].title}
          style={{
            width: "30vw",
            height: "30vh",
            objectFit: "contain",
            margin: 0,
            padding: 0,
            display: "block",
          }}
       
        
/>

          </div>
      
          <h3
            style={{
              marginTop: 12,
              color: "#0ff",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            {filteredPhotos[slideshowIndex].title}{" "}
            {filteredPhotos[slideshowIndex].year && `(${filteredPhotos[slideshowIndex].year})`}
          </h3>
      
          <button
            onClick={() => setSlideshowIndex(null)}
            style={{
              marginTop: 12,
              padding: "6px 12px",
              backgroundColor: "#003366",
              border: "1px solid #0ff",
              color: "#0ff",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "Courier New",
              flexShrink: 0,
            }}
          >
            Stop Slideshow
          </button>
        </div>
      )}
      
      
    </div>
  );
}