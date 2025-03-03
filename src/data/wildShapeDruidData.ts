import { ClassData } from '../types';

export const wildShapeDruidData: ClassData = {
  id: 'wild-shape-druid',
  name: 'Wild Shape Druid',
  description: 'A versatile druid build focused on shapeshifting abilities and nature magic',
  abilityScores: {
    strength: 10,
    dexterity: 14,
    constitution: 16,
    intelligence: 8,
    wisdom: 17,
    charisma: 8
  },
  acts: [
    {
      id: 'act1',
      name: 'Act 1',
      equipmentData: [
        {
          slot: "Amulet",
          bestInSlot: "Amulet of Misty Step\nGrants Misty Step spell for mobility\n**Where to Find:** Defiled Temple Chest, Myconid Colony Vendor",
          secondaryOption: "Amulet of the Harpers\nBoosts saving throws\n**Where to Find:** Reward from Harper Stash in Act 1",
          tertiaryOption: "Amulet of Greater Health\nBoosts Constitution\n**Where to Find:** Possibly found in later acts, rare"
        },
        {
          slot: "Ring",
          bestInSlot: "Shapeshifter's Boon Ring\n+1 AC & Saving Throws while in Wild Shape\n**Where to Find:** Obtained from Strange Ox in Emerald Grove or later in Act 2",
          secondaryOption: "Ring of Protection\n+1 AC & Saving Throws\n**Where to Find:** Sold by vendors or found as loot in Act 1",
          tertiaryOption: "Ring of Psionic Protection\nAdvantage on mental saves\n**Where to Find:** Found in Act 1"
        },
        {
          slot: "Armor",
          bestInSlot: "Hedge Wanderer's Armour\n+13 AC, druid-friendly\n**Where to Find:** Sold by Arron in Emerald Grove, Act 1",
          secondaryOption: "Padded Armor +1\nLightweight armor with good AC, non-metal\n**Where to Find:** Found in Act 1 vendors",
          tertiaryOption: "Leather Armour +1\nBalanced protection for druids\n**Where to Find:** Sold by various vendors in Act 1"
        },
        {
          slot: "Boots",
          bestInSlot: "Boots of Striding\nPrevents Prone, grants Momentum when Concentrating\n**Where to Find:** Dropped by Minthara, Act 1",
          secondaryOption: "Boots of Speed\nDoubles movement speed when activated\n**Where to Find:** Found in Crèche Y'llek or Gauntlet of Shar, Act 1",
          tertiaryOption: "Displacer Beast Boots\nGrants Blur effect\n**Where to Find:** Found in Act 1"
        },
        {
          slot: "Hat",
          bestInSlot: "N/A (No Wild Shape-specific hat in Act 1)",
          secondaryOption: "Circlet of Blasting\nOnce-per-day Scorching Ray spell\n**Where to Find:** Reward from a chest in Act 1",
          tertiaryOption: "Helm of Balduran\nStrong defenses\n**Where to Find:** Obtained late Act 1"
        },
        {
          slot: "Gloves",
          bestInSlot: "N/A (Gloves do not benefit Wild Shape in Act 1)",
          secondaryOption: "Gloves of Dexterity\nSets DEX to 18\n**Where to Find:** Found in Act 1",
          tertiaryOption: "Gloves of Archery\n+2 ranged attacks, minor use in Act 1\n**Where to Find:** Found in Act 1"
        },
        {
          slot: "Weapon",
          bestInSlot: "Pale Oak\nGrants immunity to Druidic vines, casts Faithwarden's Vines\n**Where to Find:** Reward from Kagha/Rath quest in Emerald Grove, Act 1",
          secondaryOption: "Spellsparkler\nAdds Lightning Charge effect on spell casting\n**Where to Find:** Reward from Duke Ravengard/Waukeen's Rest quest, Act 1",
          tertiaryOption: "Quarterstaff +1\nGeneric early game weapon\n**Where to Find:** Generic early game weapon, Act 1"
        },
        {
          slot: "Shield",
          bestInSlot: "Adamantine Shield\nPrevents critical hits\n**Where to Find:** Obtained from Grymforge Forge, Act 1",
          secondaryOption: "Glowing Shield\n+2 AC, emits light\n**Where to Find:** Found in Owlbear Cave, Act 1",
          tertiaryOption: "Shield of Devotion\nOnce per day Shield of Faith\n**Where to Find:** Found in Act 1"
        }
      ]
    },
    {
      id: 'act2',
      name: 'Act 2',
      equipmentData: [
        {
          slot: "Helmet",
          bestInSlot: "Hedge Wanderer's Helmet\n+1 AC, non-metal\n**Where to Find:** Purchased from Arron (Druid Grove)",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Chest (Armor)",
          bestInSlot: "Hedge Wanderer Armour\n+13 AC, druid-friendly\n**Where to Find:** Purchased from Arron (Druid Grove)",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Boots",
          bestInSlot: "Boots of Striding\nPrevents Prone, grants Momentum when Concentrating\n**Where to Find:** Dropped by Minthara (Goblin Camp)",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Amulet",
          bestInSlot: "Amulet of Elemental Torment\nDeals bonus elemental damage when applying a condition\n**Where to Find:** Found in Owlbear Nest",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Ring (1)",
          bestInSlot: "Shapeshifter's Boon Ring\n+1 AC & Saving Throws while in Wild Shape\n**Where to Find:** Found in Owlbear Nest",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Ring (2)",
          bestInSlot: "Ring of Protection\n+1 AC & Saving Throws\n**Where to Find:** Purchased from Druid Grove",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Weapon (Main Hand)",
          bestInSlot: "Pale Oak\nGrants immunity to Druidic vines, casts Faithwarden's Vines\n**Where to Find:** Reward for completing Kagha's quest (Druid Grove)",
          secondaryOption: "",
          tertiaryOption: ""
        },
        {
          slot: "Off-Hand (Shield/Focus)",
          bestInSlot: "Glowing Shield\n+2 AC, emits light\n**Where to Find:** Found in Owlbear Nest",
          secondaryOption: "",
          tertiaryOption: ""
        }
      ]
    },
    {
      id: 'act3',
      name: 'Act 3',
      equipmentData: []
    }
  ],
  spells: [
    {
      level: 0,
      name: "Produce Flame",
      description: "Versatile cantrip that provides light and ranged damage.",
      isHighlighted: true
    },
    {
      level: 0,
      name: "Thorn Whip",
      description: "Pulls enemies closer, useful for positioning before Wild Shape.",
      isHighlighted: true
    },
    {
      level: 0,
      name: "Guidance",
      description: "Boosts ability checks for the party.",
      isHighlighted: false
    },
    {
      level: 1,
      name: "Entangle",
      description: "Area control spell that restrains enemies.",
      isHighlighted: true
    },
    {
      level: 1,
      name: "Goodberry",
      description: "Provides healing that can be used outside of combat.",
      isHighlighted: true
    },
    {
      level: 1,
      name: "Faerie Fire",
      description: "Grants advantage on attacks against affected targets.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Moonbeam",
      description: "Concentration spell that deals consistent damage.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Pass Without Trace",
      description: "Massive stealth bonus for the entire party.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Spike Growth",
      description: "Area denial that deals damage when enemies move through it.",
      isHighlighted: false
    },
    {
      level: 3,
      name: "Conjure Animals",
      description: "Summons beasts to fight alongside you.",
      isHighlighted: true
    },
    {
      level: 3,
      name: "Call Lightning",
      description: "Consistent damage over multiple rounds.",
      isHighlighted: true
    },
    {
      level: 4,
      name: "Polymorph",
      description: "Transform allies or enemies. Complements your Wild Shape abilities.",
      isHighlighted: true
    },
    {
      level: 4,
      name: "Guardian of Nature",
      description: "Enhances your Wild Shape forms.",
      isHighlighted: true
    },
    {
      level: 5,
      name: "Wrath of Nature",
      description: "Turns the environment against your enemies.",
      isHighlighted: true
    }
  ]
};