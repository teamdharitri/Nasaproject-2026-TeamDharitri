// Each chapter is a list of scroll steps. A step may have:
//   img        background illustration (public path)
//   speaker    nova | bolt | rover   (no speaker = narration)
//   signal     1-5 strength for rover voice (1 = broken, 5 = clear)
//   roverName  shown on the signal once identity is revealed
//   fictional  true when the line is invented for the story
//   quote      { text, source } for real-world quotes
//   overlay    title | deduction | identity | boltLearns | end
//   nasa       { src, title, caption, credit } opens the NASA data popup
//   reveal     true from the step where the real mission name is known
//              (also marks the case as solved on the case board)
// Steps using BOARD_IMG show the interactive case board instead of a side bubble.

export const BOARD_IMG = "/common/case-board.webp";
export const BOARD_INTRO_IMG = "/common/case-board-intro.webp";

// Moon cases are not written yet; they stay locked on the case board.
export const MOON_CASES = [
  { code: "L-1", codeName: "Footprints" },
  { code: "L-2", codeName: "The Guest" },
  { code: "L-3", codeName: "The Mirror" },
];

const SUSPECT_IMG = {
  Sojourner: "/m1/lander-ramp.webp",
  Spirit: "/m2/twins.webp",
  Opportunity: "/m3/eagle-crater.webp",
  "Viking 1": "/rovers/viking-1.webp",
};
export { SUSPECT_IMG };

const JPL = "Image: NASA/JPL";

export const chapters = [
  {
    id: "intro",
    code: "Start",
    codeName: "Archive X-17",
    theme: "#4fd1ff",
    steps: [
      { img: "/common/hq-nova.webp", overlay: { type: "title", kicker: "Prologue", title: "Archive X-17", subtitle: "A Mysterious Message" } },
      { img: "/common/hq-nova.webp", speaker: "nova", text: "Hello, Detective! I am Commander Nova. Welcome to the Space Detective Team! Our agency investigates forgotten and unidentified space explorers. Many historical mission archives are incomplete, and we need your help to uncover their stories." },
      { img: "/common/hq-nova.webp", speaker: "nova", text: "Your job is to investigate the evidence, identify missing hardware, and recover their original mission records." },
      { img: BOARD_INTRO_IMG, speaker: "nova", text: "Archive X-17 (damaged). Contains 6 case files: 3 from Mars, 3 from the Moon. The identity of each is locked. The archive has come a long way, and as a result, the data has become fragmented. To reveal the identity, you must go to the original source and verify the evidence. That is your task." },
      { img: BOARD_INTRO_IMG, speaker: "nova", text: "I have a gift for you." },
      { img: "/common/bolt-capsule.webp", speaker: "bolt", text: "Hello! I am BOLT-7. You can call me Bolt! I am your mission partner." },
      { img: "/common/bolt-capsule.webp", speaker: "nova", text: "Bolt was built using designs from old rovers and landers. He'll give you facts about the machines. But he won't name a mission without evidence." },
      { img: "/common/case-board.webp", speaker: "bolt", text: "Every rover has a story. Data never lies! Let's start with the first three files from Mars." },
    ],
  },

  {
    id: "m1",
    code: "Case M-1",
    codeName: "Little Wheel",
    realName: "Sojourner and Pathfinder",
    portrait: "/rovers/sojourner.webp",
    theme: "#ff8a4c",
    caseFile: { destination: "Mars", location: "Ares Vallis", difficulty: "Easy" },
    nasaSections: [
      {
        title: "Mission Record",
        items: [
          "Mission type: lander and rover. Central body: Mars.",
          "Objective: demonstrate a low-cost way to land safely on Mars and deliver its first robotic rover.",
          "Launch: December 4, 1996 UTC, from Cape Canaveral Air Force Station, Florida.",
          "Launch vehicle: Delta II 7925.",
          "Landing: July 4, 1997 at 16:56 UTC, at Ares Vallis, Mars.",
          "Lander coordinates: 19.330° latitude, 33.550° longitude.",
          "Mission ended September 27, 1997. The supplied record does not list an epoch stop time.",
        ],
      },
      {
        title: "Airbag Landing",
        items: [
          "The spacecraft entered the Martian atmosphere under parachute. Solid rockets and a first-of-its-kind giant airbag system helped cushion the landing.",
          "An onboard altimeter measured the distance to the ground. The computer inflated the airbags about 330 feet (100 meters) above the surface.",
          "The system used four large, multi-lobed bags, each containing six smaller interconnected spheres.",
          "Each large bag measured about 17 feet (5 meters) tall and 17 feet (5 meters) across. The inflated structure was about 19 feet (5.8 meters) in diameter.",
          "The spacecraft struck at about 31 mph (14 m/s), bounced as high as 50 feet (15 meters) roughly 15 times, and settled 2.5 minutes later.",
          "It came to rest about 0.6 miles (1 kilometer) from its initial impact point.",
        ],
      },
      {
        title: "Ares Vallis",
        items: [
          "\"Ares\" is the Greek counterpart of the Roman god Mars; \"vallis\" is Latin for valley.",
          "Ares Vallis is an ancient flood plain in Mars's northern hemisphere and one of the rockiest regions on the planet.",
          "Scientists chose it as a relatively safe landing site with a wide variety of rocks deposited by catastrophic floods.",
          "Early in Mars's history, a flood carrying a volume of water comparable to the Great Lakes may have crossed the plain in about two weeks.",
          "Images taken by the lander's camera on July 4 show boulders in the dry flood channel. They may be deposits from the floods that carved it.",
          "Brown windblown soil lies between the rocks. Dust in the atmosphere gives the sky its gray-tan color.",
        ],
      },
      {
        title: "Instruments and Data",
        items: [
          "Three cameras photographed the terrain for geological studies and documented the mission technologies and their operating environment.",
          "The lander's imaging instrument (IMP) photographed the landing site.",
          "The Atmospheric Structure Instrument (ASI) measured the atmosphere during descent.",
          "The Meteorology Package (MET) measured weather at the lander.",
          "Together, the atmospheric and weather instruments recorded more than 8.5 million temperature, pressure, and wind measurements.",
          "The Alpha Proton X-ray Spectrometer (APXS) analyzed the elemental composition of nearby rocks and soil.",
          "The mission returned more than 16,500 images and performed chemical analyses of rocks and soil.",
        ],
      },
      {
        title: "Science Highlights",
        items: [
          "Rounded pebbles and cobbles suggested conglomerate rocks formed by running water in a warmer past when liquid water was stable.",
          "Radio tracking precisely measured the lander's location and Mars's pole of rotation.",
          "Those measurements suggest the planet's metallic core has a radius greater than 800 miles (1,300 kilometers) but less than about 1,250 miles (2,000 kilometers).",
          "Airborne dust is magnetic. Its properties suggest maghemite, a strongly magnetic iron oxide, may have been freeze-dried onto particles like a stain or cement.",
          "An active water cycle in Mars's past may have leached iron from the crust.",
          "Dust devils were repeatedly observed and measured with temperature, wind, and pressure sensors. The gusts may help mix dust into the atmosphere.",
          "Early-morning water-ice clouds were seen in the lower atmosphere.",
          "Abrupt morning temperature changes suggest the surface warmed the air, with heat carried upward in small eddies.",
          "The lander measured temperatures of about -13°C at noon and -76°C before dawn.",
        ],
      },
      {
        title: "Names and Deployment",
        revealOnly: true,
        items: [
          "The lander was named the Carl Sagan Memorial Station, honoring the astronomer who had died the year before.",
          "The rover was named Sojourner after American civil-rights leader Sojourner Truth. A 12-year-old girl chose the name in an essay contest.",
          "The imaging instrument's full name was the Imager for Mars Pathfinder (IMP).",
          "Late on July 5, during the second Martian day (Sol 2), the rover stood 1 foot (30 centimeters) tall and rolled down the lander's rear ramp.",
          "The rear ramp was tilted 20 degrees from the surface, safely within the planned deployment limits.",
          "The rover's planned mission was seven days; it operated for about 83 days.",
        ],
      },
    ],
    steps: [
      { img: "/m1/airbag-bounce.webp", overlay: { type: "title", kicker: "Case M-1", title: "Little Wheel", subtitle: "Mars · Difficulty: Easy" } },
      { img: "/common/case-board.webp", speaker: "nova", text: "Our first file, Detective. Something crossed space and landed on Mars—without saying a word. Its name stays locked until the evidence is complete." },
      { img: "/m1/airbag-bounce.webp", speaker: "bolt", text: "The old flight log starts in Florida, mid-1990s. Destination: Mars. Mission: prove a cheaper, safer way to land a robot explorer on the surface." },
      { img: "/m1/airbag-bounce.webp", speaker: "nova", text: "More than a landing test! The promise: carry a rover safely across space, and set it down gently on another world." },
      { img: "/m1/airbag-bounce.webp", speaker: "bolt", text: "Found the landing recipe! A parachute to slow down, rockets to steer, and giant airbags wrapping it up like a bubble shield." },

      {
        img: "/m1/airbag-bounce.webp", speaker: "bolt",
        text: "Watch closely! A little altimeter counted the distance to the ground. At the perfect moment—whoosh!—the computer blew up the airbags, just before impact.",
        nasa: { src: "/m1/nasa-airbags.webp", title: "Airbags on Martian Soil", caption: "A photo taken by the lander's camera after landing. You can see the deflated white airbags and rocky ground.", credit: JPL },
      },
      { img: "/m1/airbag-bounce.webp", speaker: "nova", text: "It worked! The traveler bounced and bounced across the rocks, then went still. Mars had spared it. Time for the real detective work." },

      { img: "/m1/airbag-bounce.webp", speaker: "nova", text: "The map lights up: an ancient valley in Mars's northern hemisphere. One of the rockiest regions on the planet—and still the scientists' choice for a safe landing." },
      { img: "/m1/airbag-bounce.webp", speaker: "bolt", text: "A giant flood carved this dry channel long ago—the rocks are its diary! Look at the picture: boulders, windblown soil, and a dusty gray-tan sky." },
      { img: "/m1/airbag-bounce.webp", speaker: "nova", text: "How much water? As much as the Great Lakes, sweeping across in about two weeks! These rocks aren't scenery, Detective. They're evidence." },

      { img: "/m1/lander-ramp.webp", speaker: "bolt", text: "New log entry! Late on the second Martian day, a hidden passenger stood up... and rolled down a rear ramp onto the soil." },
      { img: "/m1/lander-ramp.webp", speaker: "nova", text: "The little traveler: six wheels, a solar panel, and a tiny antenna. But it couldn't phone home—every message went through its bigger companion." },
      { img: "/m1/lander-ramp.webp", speaker: "rover", signal: 1, fictional: true, text: "…small wheels… new ground… where is my friend…?" },
      { img: "/m1/lander-ramp.webp", speaker: "bolt", text: "Light, slow, and carrying a tiny science lab. What did it discover out there? Let's look before we guess who it is." },

      { img: "/m1/yogi.webp", speaker: "bolt", text: "The lander worked too! Three cameras to study the ground and check its own new tech, plus instruments for the air during descent and the weather below." },
      { img: "/m1/yogi.webp", speaker: "nova", text: "And the rover's secret tool: a chemical analyzer. Touch a rock—and it knows what that rock and the soil are made of." },
      {
        img: "/m1/yogi.webp",
        speaker: "bolt",
        text: "That rock has a nickname: Yogi! The rover pressed its analyzer right against it, while the lander kept watch over the work.",
        nasa: { src: "/m1/nasa-yogi.webp", title: "The Rover and the Rock \"Yogi\"", caption: "The little rover is examining the rock \"Yogi\" by touching it with an instrument.", credit: JPL },
      },
      {
        img: "/m1/yogi.webp", speaker: "bolt",
        text: "The scientists named everything—Barnacle Bill, Yogi, even Scooby-Doo! Back home came thousands of pictures, millions of weather measurements, and close-up rock reports.",
        nasa: { src: "/m1/nasa-barnacle-bill.webp", title: "The Rock \"Barnacle Bill\"", caption: "The first rock the rover examined. The lander's camera combined lots of pictures to make this clear image.", credit: JPL },
      },

      { img: "/m1/yogi.webp", speaker: "nova", text: "A clue in the pebbles! Rounded smooth—the fingerprint of running water, pressed together into rock. This Mars was once warm, with liquid water that stayed." },
      { img: "/m1/yogi.webp", speaker: "bolt", text: "Even the dust holds a clue! It's magnetic, and its minerals may be souvenirs of an ancient water cycle. The whole planet keeps a diary." },
      {
        img: "/m1/yogi.webp", speaker: "bolt",
        text: "The weather mast caught dust devils spinning past! Those gusts help stir dust into the air. And before dawn: water-ice clouds, low in the sky.",
        nasa: { src: "/m1/nasa-yogi.webp", title: "Weather and Rocks at Ares Vallis", caption: "The lander's camera documented the rover examining a rock at the landing site.", credit: JPL },
      },
      { img: "/m1/yogi.webp", speaker: "nova", text: "Here's a dawn trick: the ground warms the air, heat climbs in tiny swirls, and the temperature leaps from night-cold toward midday warmth." },

      { img: "/m1/yogi.webp", dim: true, speaker: "bolt", text: "Enough evidence, Detective! Clue one: this machine can move across the Martian ground.", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1"], reasons: { "Viking 1": "Viking 1 was a stationary lander, not a rover, so it couldn't move across the Martian ground." } } },
      { img: "/m1/yogi.webp", dim: true, speaker: "bolt", text: "Clue two: about 11 kilograms, six wheels, and an APXS instrument—no large robotic arm.", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1", "Spirit", "Opportunity"], reasons: { "Viking 1": "Viking 1 was a stationary lander and couldn't move.", Spirit: "Spirit weighed about 185 kilograms and had a robotic arm. It doesn't match the 11-kilogram clue.", Opportunity: "Opportunity also weighed about 185 kilograms and had a robotic arm. It doesn't match the 11-kilogram clue." } } },
      { img: "/m1/yogi.webp", dim: true, speaker: "bolt", text: "Final clue: it arrived inside giant airbags, rolled down a ramp, and messaged home through its lander. Which rover fits every clue?", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1", "Spirit", "Opportunity"], solved: "Sojourner", reasons: { "Viking 1": "Viking 1 was a stationary lander, not a rover.", Spirit: "Spirit was a much bigger rover, weighing about 185 kilograms. It didn't communicate through the Pathfinder lander.", Opportunity: "Opportunity was also a rover weighing about 185 kilograms. It didn't communicate through the Pathfinder lander." } } },

      {
        img: "/m1/lander-ramp.webp", dim: true, reveal: true, speaker: "rover", signal: 5, roverName: "Sojourner", fictional: true,
        text: "Yes. I'm Sojourner. And that's my friend, the Pathfinder lander.",
        overlay: {
          type: "identity", name: "Sojourner and Mars Pathfinder",
          facts: [
            ["Mission type", "Lander and rover"],
            ["First", "The first rover to drive on Mars"],
            ["Mission length", "Planned for 7 days · operated for about 83 days"],
            ["Landing site", "Ares Vallis"],
          ],
        },
      },
      { img: "/m1/lander-ramp.webp", reveal: true, speaker: "bolt", text: "The name came from a 12-year-old girl's winning essay! She chose Sojourner, after the civil-rights hero Sojourner Truth." },

      { img: "/m1/last-night.webp", reveal: true, overlay: { type: "chapterBreak", title: "The Last Message" } },
      { img: "/m1/last-night.webp", reveal: true, speaker: "rover", signal: 5, roverName: "Sojourner", fictional: true, text: "I was planned for seven days. But my friend and I kept working for about 83 days." },
      { img: "/m1/last-night.webp", reveal: true, speaker: "bolt", text: "The mission went quiet on September 27, 1997. Its short life left thousands of images, millions of weather measurements, and the first close-up chemistry of Martian rocks and soil." },
      { img: "/m1/last-night.webp", reveal: true, speaker: "rover", signal: 3, roverName: "Sojourner", fictional: true, text: "I can't hear my friend's voice anymore. But I'll stay right by its side." },
      { img: "/m1/last-night.webp", reveal: true, speaker: "nova", text: "The lander had a name too: Carl Sagan Memorial Station, for the astronomer who died the year before. The two friends still sit together in Ares Vallis." },
      { img: "/m1/last-night.webp", reveal: true, dim: true, overlay: { type: "boltLearns", text: "If you get lost, find your way back to a friend.", source: "Sojourner" } },
      { img: "/common/case-board.webp", reveal: true, speaker: "nova", text: "First file closed. But the next one... isn't alone." },
    ],
  },

  {
    id: "m2",
    code: "Case M-2",
    codeName: "The Backward Wheel",
    realName: "Spirit",
    portrait: "/rovers/spirit.webp",
    theme: "#7cc4ff",
    caseFile: { destination: "Mars", location: "Gusev Crater", difficulty: "Medium" },
    nasaSections: [
      {
        title: "Mission Record",
        items: [
          "Mission type: rover. Central body: Mars.",
          "Objective: study a range of rocks and soil for clues of past water activity.",
          "Launch: June 10, 2003, from Cape Canaveral, Florida.",
          "Mars landing: January 4, 2004 UTC, inside Gusev Crater.",
          "Mission end: May 25, 2011. The rover's last contact was March 22, 2010.",
          "Planned mission: 90 Martian days, through about April 4, 2004.",
          "Travelled about 4.8 miles (7.73 kilometers) and operated for 6 years, 2 months, and 19 days, more than 25 times its intended lifetime.",
        ],
      },
      {
        title: "Twin Rover Design",
        items: [
          "The twin rovers were built for a twin-rover mission in NASA's long-term Mars exploration program. They launched about a month apart in 2003.",
          "They were sent to opposite sides of Mars to places suspected of past liquid water, to study many kinds of rocks and soil.",
          "Each rover was about the size of a golf cart and weighed about 405 pounds (185 kilograms), roughly seven times more than the earlier small Mars rover.",
          "Mast-mounted cameras sat about 5 feet (1.5 meters) above the ground and provided 360-degree stereoscopic views.",
          "The Instrument Deployment Device (IDD), a robotic arm, placed the science tools against rocks and soil.",
        ],
      },
      {
        title: "Science Instruments",
        items: [
          "Panoramic Camera (Pancam): high-resolution color images of terrain and geological structures.",
          "Miniature Thermal Emission Spectrometer (Mini-TES): identified minerals and rock types from a distance.",
          "Alpha Particle X-ray Spectrometer (APXS): analyzed the elemental composition of rocks and soil.",
          "Mössbauer Spectrometer (MB): investigated iron-bearing minerals in Martian rocks and soil.",
          "Microscopic Imager (MI): captured high-resolution close-ups of fine details on rocks and soil.",
          "Rock Abrasion Tool (RAT): ground away the outer surface to expose fresh rock for elemental and mineral analysis.",
          "The arm-mounted suite also included magnets for collecting magnetic dust.",
        ],
      },
      {
        title: "Launch and Cruise",
        items: [
          "Liftoff was at 10:58:47 a.m. PDT (17:58:47 UTC) on June 10, 2003.",
          "The spacecraft first entered an Earth parking orbit about 100 by 2,960 miles (163 by 4,762 kilometers) at 28.5 degrees inclination.",
          "The PAM-D upper stage fired to send it into a heliocentric orbit toward Mars.",
          "A course correction followed 10 days later, with three more corrections after that.",
          "The cruise stage carrying the rover approached Mars on January 3, 2004.",
        ],
      },
      {
        title: "Entry, Descent, and Landing",
        items: [
          "About 15 minutes before atmospheric entry, the lander inside its protective aeroshell separated from the cruise stage.",
          "At about 4 to 5 miles (6 to 7.5 kilometers) altitude, a parachute deployed. Thirty seconds later, the aeroshell's bottom heat shield was released.",
          "Ten seconds after that, the rover unreeled on a tether while descending at about 230 feet per second (70 meters per second).",
          "Four large airbags, using the same proven design as an earlier Mars landing, inflated. Retrorockets fired beneath the parachute until the lander was about 28 feet (8.5 meters) above the ground.",
          "Mars's atmosphere is less than 1 percent as dense as Earth's, so a parachute alone could not slow the spacecraft enough.",
          "The package hit at 8:35 p.m. PST on January 3, 2004, at about 46 feet per second (14 meters per second). It bounced 28 times and stopped about 820 to 980 feet (250 to 300 meters) from first impact.",
          "Landing coordinates: 14.5692° south latitude, 175.4729° east longitude. The landing was inside Gusev Crater, about 8 miles (13.4 kilometers) from the planned target.",
          "The landing site was named in tribute to the seven astronauts killed when the shuttle Columbia broke apart on February 1, 2003.",
        ],
      },
      {
        title: "Surface Operations",
        items: [
          "At first, the rover sent data through Mars Global Surveyor. About 90 minutes after landing, its airbags had deflated and its petal-like solar panels deployed; it then relayed data through the 2001 Mars Odyssey orbiter.",
          "It immediately began sending spectacular images back to Earth.",
          "On January 21, 2004, the Deep Space Network lost contact. A fault in the flash-memory subsystem had put the rover into fault mode.",
          "Controllers reformatted the flash memory and uploaded a software patch to prevent memory overload. Normal operations resumed February 5.",
          "On February 6, the RAT ground the surface of a rock named Adirondack, the first time a rock had been ground on Mars. Studying its newly exposed interior revealed details about Martian soil.",
        ],
      },
      {
        title: "Mission Highlights",
        items: [
          "A visit to Bonneville Crater took the rover about 400 yards (370 meters) from its original landing point; it later reached the base of Columbia Hills.",
          "In 2005 it climbed rocky, sandy terrain toward Husband Hill and reached the summit on September 29. From there it captured true-color 360-degree panoramas of Gusev Crater.",
          "In March 2005, dust devils swept dust from the solar panels, raising available power from about 60 percent to 93 percent and extending the mission.",
          "The 2006 attempt to reach McCool Hill was cancelled, partly because a front wheel stopped working. From then on the rover drove backward, dragging the inactive wheel. The dragged wheel scraped away soil and exposed bright, silica-rich dust, evidence of contact between soil and water.",
          "In 2007, new software let both rovers make some decisions autonomously, such as whether to transmit an image or extend the arm. Massive dust storms that summer reduced solar power.",
          "At the end of 2008, a winter storm cut power to about 89 watt-hours per Martian day, compared with a typical 700 watt-hours. The rover had to rely on its batteries.",
          "Winds gradually cleared dust from the panels. By April 2009, power had risen to about 372 watt-hours per day, enough for normal science work.",
          "On May 1, 2009, the rover became stuck in soft soil beside Home Plate. Its wheels could not get traction. On November 28, its right-rear wheel also stopped working.",
        ],
      },
      {
        title: "Final Science and Recovery",
        items: [
          "By late January 2010, the mission was replanned as a stationary science platform.",
          "A new goal was to measure tiny wobbles in Mars's rotation to learn whether its core is liquid or solid.",
          "The rover needed a slight northward tilt to aim its solar panels toward the winter Sun, but the desired tilt was never achieved.",
          "Controllers could not regain contact after March 22, 2010. They sent more than 1,300 commands before officially ending recovery efforts on May 25, 2011.",
          "The most likely cause was extreme cold that made the survival heaters ineffective.",
        ],
      },
      {
        title: "Name and Landing Tribute",
        revealOnly: true,
        items: [
          "The mission was NASA's Mars Exploration Rover (MER) mission, part of the Mars Exploration Program. This rover was MER-A, the first of the twins to land.",
          "The rover's name is Spirit.",
          "Its landing site was named Columbia Memorial Station for the seven astronauts lost in the Columbia disaster.",
        ],
      },
    ],
    steps: [
      { img: "/m2/white-soil.webp", overlay: { type: "title", kicker: "Case M-2", title: "The Backward Wheel", subtitle: "Mars · Difficulty: Medium" } },
      { img: "/common/case-board.webp", speaker: "nova", text: "The second file, Detective. Two explorers left Earth for opposite sides of Mars. One is still rolling. The other left a strange trail..." },
      { img: "/m2/twins.webp", speaker: "bolt", text: "The record shows twins! Matching machines the size of golf carts: six wheels, solar panels, a tall camera mast, and a robotic arm." },
      { img: "/m2/twins.webp", speaker: "nova", text: "They were sent where water might once have changed the ground. Their job: read the rocks and soil, and find that water's fingerprints." },
      { img: "/m2/white-soil.webp", speaker: "bolt", text: "But this file is strange. One wheel stopped turning—yet a long groove cuts through the soil. Somehow, it kept moving." },
      { img: "/m2/white-soil.webp", speaker: "rover", signal: 1, fictional: true, text: "…backward… one wheel drags… my twin… where…" },

      { img: "/m2/dust-devil.webp", speaker: "nova", text: "The map points to a crater about 160 kilometers wide. Scientists wondered: did a lake once fill it?" },
      { img: "/m2/twins.webp", speaker: "bolt", text: "This rover is a giant next to our first case—about 185 kilograms! Its camera mast stands about five feet high, almost your eye level." },
      { img: "/m2/twins.webp", speaker: "bolt", text: "Its robotic arm carries a whole science kit, placed right against rocks and soil. And those twin tracks nearby? Another machine just like this one rolled here too." },

      { img: "/m2/dust-devil.webp", speaker: "nova", text: "Dust piled up on the panels. The rover's power began to fade. Then the wind sent an unexpected visitor..." },
      {
        img: "/m2/dust-devil.webp", speaker: "bolt",
        text: "A spinning dust devil swept across the panels like a giant cleaning brush! Power came back, and the journey could continue.",
        nasa: { src: "/m2/nasa-dust-devils.webp", title: "Two Dust Devils", caption: "Two moving dust devils caught by the rover's camera. Gusts like these sometimes cleaned off the solar panels.", credit: "Image: NASA/JPL/Texas A&M" },
      },
      {
        img: "/m2/dust-devil.webp",
        speaker: "nova",
        text: "The trail climbs uphill. In 2005, the rover crawled up rock and sand toward a summit overlooking the whole crater.",
        nasa: { src: "/m2/nasa-husband-hill.webp", title: "View from Husband Hill", caption: "The rover's view looking south from the top of the hill.", credit: JPL },
      },
      { img: "/m2/white-soil.webp", speaker: "bolt", text: "Then—trouble. The front wheel died. Instead of stopping, the rover drove backward, dragging the dead wheel and carving a long track across Mars." },
      {
        img: "/m2/white-soil.webp", speaker: "bolt",
        text: "The broken wheel turned into a shovel! Scraping away the top layer, it uncovered bright, silica-rich soil—a clue that water once changed this place.",
        nasa: { src: "/m2/nasa-silica.webp", title: "Silica-Rich Soil", caption: "Bright white soil uncovered when the rover dragged its broken wheel. It was found to contain about 90 percent silica.", credit: "Image: NASA/JPL/Cornell" },
      },

      { img: "/m2/dust-devil.webp", speaker: "bolt", text: "The road wasn't smooth. A memory fault once cut the signal completely! The team repaired it from Earth with a software patch—and the rover spoke again." },
      { img: "/m2/twins.webp", speaker: "nova", text: "Back online, it ground open a rock with its grinding tool—a first on Mars! Scientists could finally peek inside." },
      { img: "/m2/dust-devil.webp", speaker: "bolt", text: "The plan was just 90 Martian days. This explorer kept going—past one crater, up the hills, all the way to a summit view." },
      { img: "/m2/twins.webp", speaker: "nova", text: "From the top: a 360-degree panorama in true color. The dust devils had cleaned the panels too—a fresh burst of energy." },
      { img: "/m2/white-soil.webp", speaker: "bolt", text: "Winter was coming, so the team aimed for a hill with more sunlight. But the dragging wheel kept digging—and kept uncovering bright silica." },
      { img: "/m2/dust-devil.webp", speaker: "nova", text: "New software made the rovers clever: they could choose for themselves—send this image? Move the arm? Then dust storms darkened the sky and drained their solar power." },
      { img: "/m2/twins.webp", speaker: "bolt", text: "Then the wind helped again, sweeping the panels clean. Power returned—until soft ground beside a low plateau grabbed the wheels and held on." },
      { img: "/m2/white-soil.webp", speaker: "nova", text: "The team tried everything. Then another wheel failed. New plan: stop driving—the rover would become a stationary science station." },
      { img: "/m2/twins.webp", speaker: "bolt", text: "Even from one spot, it had work! Measure tiny wobbles in Mars's rotation—is the planet's core liquid, or solid? The rover would find out." },
      { img: "/m2/white-soil.webp", speaker: "nova", text: "For that, it needed to tilt its panels toward the winter Sun. The tilt never came. Then the signal fell silent—and more than a thousand calls brought no answer." },

      { img: "/m2/white-soil.webp", dim: true, speaker: "bolt", text: "Let's open the file. Clue one: this machine can travel over Mars on six wheels.", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1"], reasons: { "Viking 1": "Viking 1 was a stationary lander, not a rover, so it couldn't move across the Martian ground." } } },
      { img: "/m2/white-soil.webp", dim: true, speaker: "bolt", text: "Clue two: about 185 kilograms, with a robotic arm to investigate rocks and soil.", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1", "Sojourner"], reasons: { "Viking 1": "Viking 1 was a stationary lander and couldn't move.", Sojourner: "Sojourner weighed only about 11 kilograms. That doesn't match the 185-kilogram clue." } } },
      { img: "/m2/white-soil.webp", dim: true, speaker: "bolt", text: "Final clue: the crater with the old lake, the climb up the hills, and a broken wheel that uncovered silica-rich soil. Which rover fits?", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1", "Sojourner", "Opportunity"], solved: "Spirit", reasons: { "Viking 1": "Viking 1 was a stationary lander, not a rover.", Sojourner: "Sojourner was a small, 11-kilogram rover; this file describes a rover weighing 185 kilograms.", Opportunity: "Opportunity worked at Meridiani Planum. The ancient lake, nearby hills, and silica uncovered by a dragging wheel point to this rover's twin." } } },

      {
        img: "/m2/twins.webp", dim: true, reveal: true, speaker: "rover", signal: 5, roverName: "Spirit", fictional: true,
        text: "Yes. I'm Spirit. I was the first of the twins to land on Mars.",
        overlay: {
          type: "identity", name: "Spirit",
          facts: [
            ["Mission", "Mars Exploration Rover mission · MER-A"],
            ["Landing", "January 4, 2004 · Gusev Crater"],
            ["Planned duration", "90 Martian days"],
            ["Actual mission duration", "6 years, 2 months, 19 days"],
            ["Distance traveled", "4.8 miles (7.73 kilometers)"],
            ["Major discovery", "Silica-rich soil, evidence of past water"],
            ["Twin", "Locked in File M-3"],
          ],
        },
      },

      { img: "/m2/twins.webp", reveal: true, speaker: "bolt", text: "The file speaks: Spirit, rover MER-A. One of two twins, sent to opposite sides of Mars to hunt for clues of ancient water." },
      { img: "/m2/twins.webp", reveal: true, speaker: "nova", text: "Its landing site was later named Columbia Memorial Station, for the seven astronauts lost with the shuttle Columbia." },
      { img: "/m2/troy.webp", reveal: true, overlay: { type: "chapterBreak", title: "The Last Message" } },
      {
        img: "/m2/troy.webp", reveal: true, speaker: "nova",
        text: "By May 2009, Spirit was trapped in soft soil beside a low plateau called Home Plate. The slippery ground gave its wheels no grip.",
        nasa: { src: "/m2/nasa-troy.webp", title: "Trapped in Soft Soil", caption: "A computer-made image from data sent by the rover, showing how far its wheels sank into the soft sand.", credit: JPL },
      },
      { img: "/m2/troy.webp", reveal: true, speaker: "bolt", text: "The team tried for months. On Earth, they even stuck a test rover in soft soil to practice the escape! On November 28, another wheel—the right rear one—stopped working." },
      { img: "/m2/troy.webp", reveal: true, speaker: "rover", signal: 4, roverName: "Spirit", fictional: true, text: "I can't move. But I can still measure and listen. I'll keep working right here." },
      { img: "/m2/troy.webp", reveal: true, speaker: "nova", text: "In late January 2010, the plan changed: stay in place and listen for tiny wobbles in Mars's spin—liquid core, or solid? But the tilt toward the winter Sun never came." },
      { img: "/m2/troy.webp", reveal: true, speaker: "bolt", text: "After March 22, 2010—silence. More than 1,300 commands, no answer. Recovery ended on May 25, 2011. Extreme cold had likely beaten the survival heaters." },
      { img: "/m2/troy.webp", reveal: true, speaker: "rover", signal: 2, roverName: "Spirit", fictional: true, text: "I was meant to last 90 Martian days. I traveled for years. …Tell my twin I kept trying." },
      { img: "/m2/troy.webp", reveal: true, speaker: "bolt", text: "The final count: 4.8 miles—7.73 kilometers—and six years, two months, and 19 days of work. More than 25 times its planned life." },
      { img: "/m2/troy.webp", reveal: true, speaker: "nova", text: "Dust storms, software faults, broken wheels, a final winter—it survived them all. And one dead wheel uncovered bright soil that proved water once touched Mars." },
      { img: "/m2/troy.webp", reveal: true, dim: true, overlay: { type: "boltLearns", text: "When you hit an obstacle, keep going—even if you have to go backward.", source: "Spirit" } },
      { img: "/common/case-board.webp", reveal: true, speaker: "nova", text: "When Spirit stopped, its twin was still rolling on the other side of Mars. The next file is that twin." },
    ],
  },

  {
    id: "m3",
    code: "Case M-3",
    codeName: "Little Blueberries",
    realName: "Opportunity",
    portrait: "/rovers/opportunity.webp",
    theme: "#ffc65c",
    caseFile: { destination: "Mars", location: "Meridiani Planum", difficulty: "Hard" },
    nasaSections: [
      {
        title: "Mission Record",
        items: [
          "Mission type: rover. Science target: the Martian surface. Status: successful.",
          "Objective: search for a range of rocks and soil types and look for clues of past water activity.",
          "Launch: July 7, 2003, at 20:18:15 PDT, from Cape Canaveral, Florida, followed by a six-month cruise to Mars.",
          "Landing: January 25, 2004 UTC (January 24 PST), on Meridiani Planum, just 20 days after its twin landed on the other side of the planet.",
          "Planned mission: 90 Martian days, about three Earth months, and 1,100 yards (1,000 meters) of driving.",
          "Actual mission: 14 years and 138 days, or 5,352 Martian days, nearly 60 times the planned lifetime.",
          "Distance traveled: 28.06 miles (45.16 kilometers), a record for driving on another world until 2026.",
          "Mission end: the last signal was heard on June 10, 2018, during a Mars-wide dust storm. After more than 1,000 contact attempts, NASA declared the mission complete on February 13, 2019.",
        ],
      },
      {
        title: "Twin Rover Design",
        items: [
          "The twin rovers were built for a twin-rover mission in NASA's long-term Mars exploration program and were sent to opposite sides of the planet to study sites where conditions may once have been favorable for life—places suspected of having been affected by liquid water in the past.",
          "Each rover was about the size of a golf cart and weighed 408 pounds (185 kilograms), seven times more than the Sojourner rover.",
          "The rovers moved from place to place, performing on-site geological investigations and taking photographs with mast-mounted cameras about 5 feet (1.5 meters) off the ground, providing 360-degree stereoscopic views of the terrain.",
          "A suite of instruments, including the Mössbauer spectrometer (MB), the Alpha Particle X-ray Spectrometer (APXS), magnets, the Microscopic Imager (MI), and the Rock Abrasion Tool (RAT), was deployed on a robotic arm called the Instrument Deployment Device (IDD). The arm placed the tools directly against soil or rock and activated them.",
          "A high-gain antenna carried the rover's messages far across space to Earth.",
          "A warm electronics box with heaters and insulating layers kept the circuits alive: days reach only about -20°C and nights about -90°C.",
        ],
      },
      {
        title: "Landing at Meridiani Planum",
        items: [
          "Meridiani Planum is a flat plain near the Martian equator, chosen for its abundant deposits of hematite, an iron-rich mineral that typically forms in liquid water.",
          "After a final course correction on January 16, 2004, the spacecraft dived into the Martian atmosphere. The descent was uneventful, with no anomalies.",
          "The lander, enclosed in airbags, touched down at 21:05 PST (04:54 UTC) and bounced at least 26 times before coming to rest at 1.9483° south latitude and 354.47417° east longitude, about 9 miles (14.9 kilometers) from the intended target.",
          "The rover landed on a relatively flat plain but inside a small impact crater, a lucky \"hole-in-one.\" The landing area was named in tribute to a Space Shuttle crew lost in 1986.",
        ],
      },
      {
        title: "First Discoveries",
        items: [
          "Inside the tiny landing crater, the rover immediately spotted exposed bedrock, confirming that liquid water once flowed on the Martian surface.",
          "Small, iron-rich round structures, nicknamed \"blueberries,\" were found embedded in the rock. These hematite spherules formed in standing water.",
          "On March 22, 2004, after extensive studies, the rover climbed the crater's edge and rolled out, heading for Endurance Crater about 820 yards (750 meters) away.",
          "It took spectacular photographs of the abandoned landing area, where the lander, backshell, and parachute were still visible.",
          "On sol 180, July 26, 2004, the rover had already doubled its 90-day primary mission. That day its front hazard-avoidance camera caught a dramatic self-portrait of the rover's long shadow as it moved into Endurance Crater.",
          "In January 2005, near its own discarded heat shield, it found an unusual, basketball-sized rock named \"Heat Shield Rock\" that proved to be an iron-nickel meteorite, the first meteorite discovered on another planet.",
        ],
      },
      {
        title: "Victoria Crater",
        items: [
          "In 2005, the rover got stuck after driving into an area where several of its wheels were buried in sand. Controllers at NASA's Jet Propulsion Laboratory maneuvered it a few inches at a time and freed it in June 2005, after six weeks.",
          "Through the rest of 2005 and into 2006, it headed slowly south, first arriving at Erebus, a highly eroded impact crater about 980 feet (300 meters) in diameter.",
          "In March 2006, it began the last mile (2 kilometers) of the journey. Victoria stretches half a mile (800 meters) across, wider and deeper than any crater yet examined by either twin. After a 21-month trip, the rover arrived in September 2006, drove onto the Cape Verde promontory on the crater's scalloped rim, and sent back striking pictures.",
          "Severe dust storms plagued Mars in 2007. By July 18, the solar panels were delivering only 128 watt-hours, the lowest for either rover at that point, and all science activities were suspended. This rover faced much more severe conditions than its twin.",
          "After about six weeks the storms abated. On September 11, 2007, the rover entered Victoria Crater, staying inside for almost a year, sending back a wealth of information on its soil and examining thick stacks of ancient sedimentary rock layers.",
        ],
      },
      {
        title: "The Road to Endeavour",
        items: [
          "The next target was the enormous Endeavour Crater, about 13 miles (22 kilometers) in diameter.",
          "On the way, the rover studied the so-called Marquette Island rock, \"different in composition and character from any known rock on Mars or meteorite from Mars,\" according to principal investigator Steve Squyres. It appeared to have originated deep in the Martian crust, far from the landing site, unlike almost all the rocks the rover had studied before.",
          "By March 24, 2010, the odometer read about 12 miles (20 kilometers), more than double the twin's total and far beyond the nominal mission of 1,968 feet (600 meters).",
          "Two months later, on May 20, with its twin already inactive, the rover broke the record set by the Viking 1 lander for the longest continuous operation on the surface of Mars: 6 years and 116 days.",
          "By June 2011 it had logged about 18 miles (30 kilometers), and on August 9, 2011, after a journey of nearly three years and about 13 miles (21 kilometers), it arrived at Endeavour.",
          "At Endeavour it discovered clay minerals that pointed to an ancient environment with neutral pH water suitable for microbial life.",
          "In September 2011, NASA announced that an aluminum cuff serving as a cable shield on each rover's RAT was made from aluminum recovered from the World Trade Center towers, destroyed on September 11, 2001. Honeybee Robotics, which helped build the tool, had its offices in New York that day, and JPL and Honeybee included the metal as a memorial to the victims.",
          "Through late 2012 and into 2013, the rover worked around Matijevic Hill, which overlooks Endeavour. By August 2013 it was at Solander Point, an area of contact between a rock layer formed in acidic wet conditions and an older one from a more \"neutral\" environment.",
        ],
      },
      {
        title: "Records and the Marathon",
        items: [
          "On May 16, 2013, the rover passed the record for the farthest distance traveled by any NASA vehicle on another celestial body: 22.21 miles (35.744 kilometers), a record set by the Apollo 17 Lunar Roving Vehicle in December 1972.",
          "On January 3, 2014, it passed 10 years on the surface, with relatively clean solar panels allowing increased power. A \"selfie\" combining multiple frames taken by the panoramic camera through three color filters from March 22 to 24, 2014, showed a rover swept clean by wind, raising hopes for the mission's future.",
          "On July 28, 2014, it passed the distance record set by the Soviet rover Lunokhod 2, showing 25.01 miles (40.25 kilometers) against the Soviet vehicle's 24 miles (39 kilometers). Russian analysis of images from NASA's Lunar Reconnaissance Orbiter suggests Lunokhod 2 may have traveled as much as 26 miles (42 kilometers).",
          "The rover was generally in good health, but after a month of computer resets interfered with its science goals, controllers performed a complete reformat of the flash memory on September 4, 2014. The same day, NASA announced a ninth mission extension, adding two more years with a mission to nearby Marathon Valley. The rover had covered about 25 miles (40.69 kilometers) by the beginning of September.",
          "In December 2014, NASA reported problems saving telemetry into \"non-volatile\" flash memory, traced to one of seven memory banks (Bank 7). By May 2015, the rover was configured to operate in RAM-only mode.",
          "On March 24, 2015, the rover completed an off-world marathon: 26.219 miles (42.195 kilometers) in 11 years and 2 months. Announcing the milestone the next day, NASA called it \"the first human enterprise to exceed marathon distance of travel on another world.\"",
          "In June 2015, Mars passed almost directly behind the Sun as seen from Earth, and communications with the rover were curtailed.",
        ],
      },
      {
        title: "The Final Valley",
        items: [
          "In its seventh Martian winter (Earth winter 2015–2016), the rover was kept at energy-minimum levels, but it still used its RAT to remove surface dust from a target called \"Private John Potts,\" a name referencing a member of the Lewis and Clark Expedition.",
          "It explored the western rim of Endeavour, especially the south side of Marathon Valley, which slices through the crater's rim from west to east. From a perch high on a ridge on March 31, 2016 (sol 4,332), it recorded a dust devil twisting through the valley below, with a view back at its own tracks up the southern edge of the valley.",
          "On March 10, 2016, while approaching a target near the crest of Knudsen crater, it drove at a tilt of 32 degrees, breaking the record for the steepest slope driven by any rover on Mars, a record it had set itself during a climb in January 2004.",
          "In October 2016, a two-year extended mission began in the Bitterroot Valley portion of Endeavour's western rim. The plan included driving into a gully about two football fields long; the principal investigator was \"confident this is a fluid-carved gully, and that water was involved.\"",
          "On February 7, 2017, the rover passed the 27-mile (44-kilometer) mark and slowly worked toward Perseverance Valley, reaching it in the first week of May.",
          "On June 4, after snapping several panoramas, its left front wheel stalled and was left \"toed out\" by 33 degrees. After several attempts it steered straight again, though controllers found no conclusive cause.",
          "For about three weeks in June and July, communication was reduced by a solar conjunction, with the Sun between Earth and Mars. In mid-July, the rover finally entered Perseverance Valley and began driving down into the gully, and its energy dropped as Sun exposure was reduced.",
        ],
      },
      {
        title: "Name and Landing Tribute",
        revealOnly: true,
        items: [
          "The mission was NASA's Mars Exploration Rover (MER) mission, part of the Mars Exploration Program. This rover was MER-B, the second of the twins to land.",
          "The rover's name is Opportunity, nicknamed \"Oppy.\"",
          "Its landing area was named Challenger Memorial Station, in tribute to the Space Shuttle crew lost in 1986.",
        ],
      },
    ],
    steps: [
      { img: "/m3/blueberries.webp", overlay: { type: "title", kicker: "Case M-3", title: "Little Blueberries", subtitle: "Mars · Difficulty: Medium" } },
      { img: "/common/case-board.webp", speaker: "nova", text: "The third file, Detective. One twin's story is closed. This is the mirror twin: same design, same 90-day promise—very different road." },
      { img: "/m3/blueberries.webp", speaker: "bolt", text: "The record matches our last case exactly: six wheels, solar panels, a tall camera mast, a robotic arm. About 185 kilograms, golf-cart size. Built as twins." },
      { img: "/m3/marathon.webp", speaker: "nova", text: "But careful—don't confuse the twins! The last one dragged a broken wheel. This one's log just counts on: day 90... day 1,000... day 5,000..." },
      { img: "/m3/marathon.webp", speaker: "bolt", text: "Day 5,000?! A machine built for 90 days? My counting circuits are overheating!" },
      { img: "/m3/marathon.webp", speaker: "rover", signal: 1, fictional: true, text: "…dust… darkness… I'm still… moving…" },

      { img: "/m3/eagle-crater.webp", speaker: "nova", text: "The map lights up: Meridiani Planum, a flat plain near the Martian equator. Why here? Hematite—an iron-rich mineral that usually forms in liquid water." },
      {
        img: "/m3/eagle-crater.webp", speaker: "bolt",
        text: "The landing was smooth—but the airbag-wrapped lander bounced at least 26 times! It rolled to a stop 9 miles (14.9 kilometers) off target, inside a tiny crater only 22 meters wide. A \"hole-in-one in space!\"",
        nasa: { src: "/m3/nasa-eagle-crater.webp", title: "Eagle Crater", caption: "The rover looks back after driving out of the crater. Wheel tracks crisscross the inside, and layers of rock line the rim.", credit: JPL },
      },
      { img: "/m3/eagle-crater.webp", speaker: "nova", text: "Inside that little crater: the first discovery. Exposed bedrock, stacked in thin layers—and layers like these usually form underwater. Liquid water once flowed on the surface of Mars. Confirmed." },
      {
        img: "/m3/blueberries.webp", speaker: "bolt",
        text: "And look—\"blueberries\"! Small, round grains of hematite embedded right in the rock. They usually form in standing water.",
        nasa: { src: "/m3/nasa-berries.webp", title: "\"Blueberries\" on the Ground", caption: "Small round grains photographed by the rover's microscopic camera. They aren't really blue—the colors in the picture were changed to show details.", credit: "Image: NASA/JPL/Cornell/USGS" },
      },
      { img: "/m3/eagle-crater.webp", speaker: "nova", text: "On March 22, 2004, the rover climbed over the rim and rolled out. One last look back: spectacular photos of its abandoned lander, backshell, and parachute. Then off to a larger crater, 820 yards (750 meters) away." },
      { img: "/m3/marathon.webp", speaker: "bolt", text: "By July 26, 2004—Martian day 180—it had already doubled its planned mission! January 2005, beside its own discarded heat shield: a basketball-sized rock of iron and nickel. A meteorite! The first ever found on another planet." },
      { img: "/m3/marathon.webp", speaker: "nova", text: "The road wasn't always easy. In 2005 it sank into soft ground, several wheels buried in sand. Engineers freed it a few inches at a time—and after six weeks, it rolled on." },
      { img: "/m3/marathon.webp", speaker: "bolt", text: "Two years traveling south: past Erebus, an old eroded crater, then a 21-month trip to Victoria—800 meters wide, deeper than anything either twin had studied. After a dust-storm summer on almost no power, it drove down inside for a year of work." },
      { img: "/m3/marathon.webp", speaker: "nova", text: "Then the longest drive yet: three whole years to Endeavour, a giant crater 22 kilometers wide. On the way, a strange rock that seemed to come from deep inside the Martian crust. Arriving in August 2011, it found clay minerals—signs of ancient water with a neutral pH. Water that microbes could have lived in." },
      {
        img: "/m3/marathon.webp", speaker: "bolt",
        text: "And in the cracks of the crater's rim: bright white veins of gypsum! Water once flowed right through them.",
        nasa: { src: "/m3/nasa-homestake.webp", title: "The White Vein Called \"Homestake\"", caption: "A white line of gypsum in a crack in the rock. Strong evidence that water once flowed underground.", credit: "Image: NASA/JPL-Caltech/Cornell/ASU" },
      },
      { img: "/m3/marathon.webp", speaker: "nova", text: "The records kept falling! 2010: past Viking 1's mark for working nonstop on Mars—6 years and 116 days. 2013: past the Apollo 17 moon rover's distance record. 2014: past the Soviet Lunokhod 2's." },
      {
        img: "/m3/marathon.webp", speaker: "bolt",
        text: "March 2015, after 11 years and 2 months: a full marathon—42.195 kilometers! No machine from Earth had ever driven that far on another world.",
        nasa: { src: "/m3/nasa-marathon.webp", title: "The First Marathon on Mars", caption: "A map of the rover's entire journey, from tiny Eagle Crater to enormous Endeavour Crater.", credit: "Image: NASA/JPL-Caltech/Univ. of Arizona" },
      },
      { img: "/m3/marathon.webp", speaker: "nova", text: "The machine was aging. Its flash memory began to fail, so engineers reformatted it and later ran the rover on RAM alone. In its seventh winter it still swept dust off rocks, day after day. The wind even cleaned its panels for a famous \"selfie.\"" },
      { img: "/m3/marathon.webp", speaker: "bolt", text: "It even crossed a slope tilted 32 degrees—the steepest any rover had driven on Mars, breaking a record it set itself back in 2004!" },
      { img: "/m3/marathon.webp", speaker: "nova", text: "In 2017 it reached its last destination: a gully cutting through the rim of Endeavour, carved—scientists believe—by water. Down it went, gently, saving its power." },

      { img: "/m3/eagle-crater.webp", dim: true, speaker: "bolt", text: "Let's open the file. Clue one: this machine can travel over Mars on six wheels.", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1"], reasons: { "Viking 1": "Viking 1 was a stationary lander, not a rover, so it couldn't move across the Martian ground." } } },
      { img: "/m3/eagle-crater.webp", dim: true, speaker: "bolt", text: "Clue two: about 185 kilograms, with a robotic arm for rocks and soil.", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1", "Sojourner"], reasons: { "Viking 1": "Viking 1 was a stationary lander and couldn't move.", Sojourner: "Sojourner weighed only about 11 kilograms. That doesn't match the 185-kilogram clue." } } },
      { img: "/m3/eagle-crater.webp", dim: true, speaker: "bolt", text: "Final clue: a hematite-rich plain, round \"blueberries\" in the bedrock, and plain tracks from all six wheels—no dragging wheel like its twin's. Which rover fits the evidence?", overlay: { type: "deduction", suspects: ["Sojourner", "Spirit", "Opportunity", "Viking 1"], out: ["Viking 1", "Sojourner", "Spirit"], solved: "Opportunity", reasons: { "Viking 1": "Viking 1 was a stationary lander, not a rover.", Sojourner: "Sojourner was a small, 11-kilogram rover; this file describes a rover weighing 185 kilograms.", Spirit: "Spirit worked at Gusev Crater, on the other side of Mars, and dragged a broken wheel behind it. The hematite \"blueberries\" and the plain six-wheel tracks belong to its twin." } } },

      {
        img: "/m3/eagle-crater.webp", dim: true, reveal: true, speaker: "rover", signal: 5, roverName: "Opportunity", fictional: true,
        text: "Yes. I'm Opportunity. Everyone calls me Oppy for short.",
        overlay: {
          type: "identity", name: "Opportunity (\"Oppy\")",
          facts: [
            ["Mission", "Mars Exploration Rover mission · MER-B"],
            ["Landing", "January 25, 2004 · Meridiani Planum"],
            ["Planned duration", "90 Martian days"],
            ["Actual mission duration", "14 years, 138 days (5,352 Martian days)"],
            ["Distance traveled", "28.06 miles (45.16 kilometers)"],
            ["Major discovery", "Ancient water, and conditions that could have sustained microbial life"],
            ["Twin", "Spirit (Gusev Crater)"],
          ],
        },
      },
      { img: "/m3/eagle-crater.webp", reveal: true, speaker: "bolt", text: "The file opens: Opportunity, rover MER-B, the second twin to land. Launched July 7, 2003, from Cape Canaveral—and it reached Meridiani Planum just 20 days after Spirit." },
      { img: "/m3/eagle-crater.webp", reveal: true, speaker: "nova", text: "Its landing site was named Challenger Memorial Station, in tribute to the Space Shuttle crew lost in 1986." },
      {
        img: "/m2/twins.webp", reveal: true, speaker: "bolt",
        text: "A 9-year-old girl named Sophie Collis chose the twins' names. In her essay, she wrote:",
        quote: { text: "I used to live in an orphanage. It was dark, cold, and lonely. At night, I liked looking up at the sparkling sky. ...Thank you for \"Spirit\" and \"Opportunity.\"", source: "Sophie Collis's winning essay, 2003 (adapted translation)" },
      },

      { img: "/m3/dust-storm.webp", reveal: true, overlay: { type: "chapterBreak", title: "The Last Message" } },
      { img: "/m3/dust-storm.webp", reveal: true, speaker: "nova", text: "Its final years were slow. A wheel stalled on the way into the gully, and the Sun slipped between the planets, muting the radios for weeks. In mid-July 2017, it entered its last home: Perseverance Valley—a name that means perseverance." },
      {
        img: "/m3/dust-storm.webp", reveal: true, speaker: "bolt",
        text: "Then, in June 2018, a historic dust storm swallowed the whole planet. No sunlight could reach the solar panels. The last signal came on June 10, 2018.",
        nasa: { src: "/m3/nasa-darkness.webp", title: "Darkness Falls", caption: "A simulation of how the sky grew darker from the rover's location during the dust storm. From left to right, the Sun slowly disappears.", credit: "Image: NASA/JPL-Caltech/TAMU" },
      },
      { img: "/m3/dust-storm.webp", reveal: true, speaker: "nova", text: "Earth called more than 1,000 times. No answer. On February 13, 2019, NASA declared the mission complete." },
      {
        img: "/m3/dust-storm.webp", reveal: true, speaker: "bolt",
        text: "A journalist turned Oppy's final data into a poem. The line spread around the world:",
        quote: { text: "My battery is running low, and it's getting dark.", source: "Not the rover's actual words, but an emotional interpretation of its final data" },
      },
      { img: "/m3/dust-storm.webp", reveal: true, speaker: "nova", text: "On the night of February 12, the team called one last time—and played an old song: \"I'll Be Seeing You.\" It means \"I'll see you again.\"" },
      { img: "/m3/dust-storm.webp", reveal: true, speaker: "rover", signal: 3, roverName: "Opportunity", fictional: true, text: "I was meant to last 90 days and drive 1,100 yards. I kept going for almost 15 years and more than 28 miles. My final resting place is Perseverance Valley." },
      { img: "/m3/dust-storm.webp", reveal: true, speaker: "bolt", text: "Its distance record stood until October 11, 2026, when NASA's Perseverance rover finally drove farther. And the next rover sent to Mars? Also named Perseverance." },
      { img: "/m3/dust-storm.webp", reveal: true, dim: true, overlay: { type: "boltLearns", text: "Find your own way, and keep going on the Sun's power.", source: "Opportunity" } },
      { img: "/common/case-board.webp", reveal: true, speaker: "nova", text: "Spirit and Opportunity. Twins, on opposite sides of Mars. Both files are complete now, Detective." },
      { img: "/common/cover.webp", reveal: true, overlay: { type: "end" } },
    ],
  },
];
