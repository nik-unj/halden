(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    const setOpen = (open) => {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("nav-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const rooms = {
    east: {
      name: "The East Room",
      kind: "Garden · Queen",
      price: "From $420 / night",
      sleeps: "Sleeps 2 · 280 sq ft",
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80",
      copy: "A corner room over the herb garden. Two windows, a writing desk, and a bed dressed in flax linen. It is the room we give to people who like to be awake before the house is.",
      amenities: ["Queen bed", "Garden view", "Writing desk", "Soaking tub", "No television"]
    },
    "widows-walk": {
      name: "The Widow's Walk",
      kind: "Water · Suite",
      price: "From $680 / night",
      sleeps: "Sleeps 2 · 460 sq ft",
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
      copy: "Top of the house, with the original walk and a view that takes in the whole bay. There is a sitting room just large enough for two and a pot of tea.",
      amenities: ["King bed", "Bay view", "Sitting room", "Private walk", "Fireplace"]
    },
    library: {
      name: "The Library",
      kind: "House · King",
      price: "From $540 / night",
      sleeps: "Sleeps 2 · 340 sq ft",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
      copy: "Shelves we actually expect you to use, a fireplace, and a king bed set away from the door. It stays quiet even when the dining room is full.",
      amenities: ["King bed", "Fireplace", "Reading chairs", "Courtyard light", "Record player"]
    },
    boathouse: {
      name: "The Boathouse Loft",
      kind: "Water · Loft",
      price: "From $610 / night",
      sleeps: "Sleeps 2 · 390 sq ft",
      image:
        "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=1400",
      copy: "A cedar loft above the old boatsheds, a short walk from the main house. You hear the tide. Mornings come with a tray if you ask the night before.",
      amenities: ["Queen bed", "Water side", "Separate entrance", "Breakfast tray", "Dog friendly"]
    },
    orchard: {
      name: "The Orchard",
      kind: "Garden · Queen",
      price: "From $390 / night",
      sleeps: "Sleeps 2 · 260 sq ft",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
      copy: "Our smallest room, under the apple trees. A clawfoot tub, a good lamp, and no television. People book it when they mean to read.",
      amenities: ["Queen bed", "Clawfoot tub", "Orchard view", "Armchair", "No television"]
    },
    captain: {
      name: "The Captain's Suite",
      kind: "Suite · Sea side",
      price: "From $820 / night",
      sleeps: "Sleeps 3 · 620 sq ft",
      image:
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1400",
      copy: "Two rooms on the sea side: a bedroom, a sitting room with a daybed, and a stone soaking tub. We hold it for long stays and for weather worth watching.",
      amenities: ["King bed", "Daybed", "Soaking tub", "Sea view", "Sitting room"]
    }
  };

  const dialog = document.querySelector("[data-dialog]");
  if (dialog) {
    const title = dialog.querySelector("[data-dialog-title]");
    const kind = dialog.querySelector("[data-dialog-kind]");
    const copy = dialog.querySelector("[data-dialog-copy]");
    const price = dialog.querySelector("[data-dialog-price]");
    const sleeps = dialog.querySelector("[data-dialog-sleeps]");
    const image = dialog.querySelector("[data-dialog-image]");
    const amenities = dialog.querySelector("[data-dialog-amenities]");
    const book = dialog.querySelector("[data-dialog-book]");

    const openRoom = (id) => {
      const room = rooms[id];
      if (!room) return;
      title.textContent = room.name;
      kind.textContent = room.kind;
      copy.textContent = room.copy;
      price.textContent = room.price;
      sleeps.textContent = room.sleeps;
      image.src = room.image;
      image.alt = room.name;
      amenities.replaceChildren(
        ...room.amenities.map((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          return li;
        })
      );
      book.href = `inquire.html?room=${id}`;
      dialog.showModal();
    };

    document.querySelectorAll("[data-room-open]").forEach((button) => {
      button.addEventListener("click", () => openRoom(button.dataset.roomOpen));
    });

    dialog.querySelectorAll("[data-dialog-close]").forEach((button) => {
      button.addEventListener("click", () => dialog.close());
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  const filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    const cards = [...document.querySelectorAll("[data-tags]")];
    const empty = document.querySelector("[data-empty]");

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      filterBar.querySelectorAll("button").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      const filter = button.dataset.filter;
      let shown = 0;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.tags.split(" ").includes(filter);
        card.classList.toggle("is-hidden", !match);
        if (match) shown += 1;
      });
      if (empty) empty.classList.toggle("is-visible", shown === 0);
    });
  }

  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const note = form.parentElement.querySelector("[data-newsletter-note]");
      if (!input.value.trim() || !input.validity.valid) {
        input.focus();
        return;
      }
      if (note) {
        note.textContent = "You are on the list for this demo. Nothing was emailed.";
      }
      input.value = "";
    });
  });

  const inquiry = document.querySelector("[data-inquiry]");
  if (inquiry) {
    const roomField = inquiry.querySelector("[name='room']");
    const requested = new URLSearchParams(window.location.search).get("room");
    if (requested && roomField && rooms[requested]) {
      roomField.value = requested;
    }

    const arrival = inquiry.querySelector("[name='arrival']");
    const departure = inquiry.querySelector("[name='departure']");
    const today = new Date().toISOString().slice(0, 10);
    if (arrival) arrival.min = today;
    if (departure) departure.min = today;

    arrival?.addEventListener("change", () => {
      if (departure && arrival.value) departure.min = arrival.value;
    });

    const fields = [
      { name: "name", message: "Add the name the room should be held under." },
      { name: "email", message: "Add an email we can write back to." },
      { name: "arrival", message: "Choose an arrival date." },
      { name: "departure", message: "Choose a departure date." },
      { name: "guests", message: "Tell us how many people are coming." }
    ];

    const showError = (input, message) => {
      const field = input.closest(".field");
      const error = field.querySelector(".error");
      const invalid = Boolean(message);
      field.classList.toggle("has-error", invalid);
      error.textContent = message || "";
      return !invalid;
    };

    const validate = (input, message) => {
      if (!input.value.trim() || !input.checkValidity()) return showError(input, message);
      if (input.name === "departure" && arrival?.value && input.value < arrival.value) {
        return showError(input, "Departure should be on or after arrival.");
      }
      return showError(input, "");
    };

    fields.forEach(({ name, message }) => {
      const input = inquiry.querySelector(`[name='${name}']`);
      input?.addEventListener("blur", () => validate(input, message));
    });

    inquiry.addEventListener("submit", (event) => {
      event.preventDefault();
      let ok = true;
      fields.forEach(({ name, message }) => {
        const input = inquiry.querySelector(`[name='${name}']`);
        if (!validate(input, message)) ok = false;
      });
      if (!ok) {
        inquiry.querySelector(".has-error input, .has-error select")?.focus();
        return;
      }
      inquiry.classList.add("is-hidden");
      document.querySelector("[data-success]")?.classList.add("is-visible");
    });
  }
})();
