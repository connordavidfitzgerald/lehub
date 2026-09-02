// The advisory board. Same shape as team.js so both feed the one TeamGrid.
export const advisors = [
    {
        name: "Juhi\nSohani",
        pronouns: "she/her",
        role: "Advisor",
        photo: "juhi.png",
        bio: "Juhi Sohani is a communicator, digital organizer, and co-founder of Weaver and Imagining an Otherwise. She focuses on maximizing the collective impact of social movements across Canada by supporting campaigners to connect with real, politically persuadable people online and meet them on the ground. Juhi has facilitated narrative development and digital strategy at Amnesty International, the Canadian Federation of Students, and Inuit Tapiriit Kanatami. The student movement led her to the climate movement and Palestine solidarity, where she continues to experiment with using digital tools to facilitate offline power-building. She collaborates with peers around the world at hope-based comms to help make the case for the world people want to see. She was named one of the Top 50 Women Leaders of Montreal for 2023 by Women We Admire, and has not been very admirable since. Juhi is grateful to have found home and connection on the unceded traditional territory of the Kanien'kehà:ka.",
    },
    {
        name: "Emilia\nBelliveau",
        pronouns: "she/her",
        role: "Advisor",
        // Capital E is the filename on disk, and Img.astro matches the glob key
        // exactly — "emilia.png" resolves to the placeholder on a case-sensitive
        // filesystem even though macOS lets it pass.
        photo: "Emilia.png",
        bio: "Emilia Belliveau has worked on climate and environmental justice issues since 2012, as a community organizer, academic researcher, campaigner with environmental non-profits, and as a policy analyst in the British Columbia Ministry of Energy. She is currently the Energy Transition Program Manager at Environmental Defence. Prior to this she worked with remote First Nations in BC to accelerate the transition off diesel with community-led renewable energy projects and energy efficiency. Emilia holds a master’s degree from the University of Victoria (UVic), where her studies in political ecology focused on fossil fuel divestment, anti-capitalism, youth politicization, and the climate justice movement. Emilia is happiest on the dance floor.",
    },
];
