import { ClassData } from '../types';

export const evokerWizardData: ClassData = {
  id: 'evoker-wizard',
  name: 'Evoker Wizard',
  description: 'A specialist in destructive magic, focusing on elemental damage spells',
  abilityScores: {
    strength: 8,
    dexterity: 14,
    constitution: 14,
    intelligence: 16,
    wisdom: 12,
    charisma: 10
  },
  acts: [
    {
      id: 'act1',
      name: 'Act 1',
      equipmentData: [
        {
          slot: "Helmet",
          bestInSlot: "Circlet of Fire\nFree Fire Bolt cantrip & synergizes with fire spells\n**Where to Find:** Grymforge, looted from a vendor or chest",
          secondaryOption: "Circlet of Blasting\nOnce-per-day Scorching Ray spell\n**Where to Find:** Vendor in the Underdark or Goblin Camp",
          tertiaryOption: "Circlet of Elements\nMinor boosts to elemental spell damage\n**Where to Find:** Sold by traders in Act 1"
        },
        {
          slot: "Chest (Armor)",
          bestInSlot: "Robe of the Weave\nBoosts AC and Arcane power\n**Where to Find:** Looted from powerful enemies or vendors in Grymforge",
          secondaryOption: "Mage Robes\nBasic defense for early-game wizards\n**Where to Find:** Common loot or purchased in Druid Grove",
          tertiaryOption: "Silk Robes\nSlightly boosts AC, but weaker than others\n**Where to Find:** Random loot or vendor in Act 1"
        },
        {
          slot: "Gloves",
          bestInSlot: "Gloves of Dexterity\nSets DEX to 18, boosting AC and initiative\n**Where to Find:** Vendor in the Goblin Camp (Act 1)",
          secondaryOption: "Gloves of Power\nOccasionally applies Bane to enemies\n**Where to Find:** Looted from goblin leaders in Act 1",
          tertiaryOption: "Mystic Gloves\nIncreases spell range slightly\n**Where to Find:** Found in Underdark or lootable in Act 1"
        },
        {
          slot: "Boots",
          bestInSlot: "Boots of Speed\nDoubles movement when activated (Haste-like effect)\n**Where to Find:** Rare vendor item or loot in Grymforge",
          secondaryOption: "Boots of Elvenkind\nImproves Stealth & movement\n**Where to Find:** Found in Underdark or Act 1 vendors",
          tertiaryOption: "Boots of Levitation\nGrants Levitate spell\n**Where to Find:** Vendor in the Underdark or lootable in Act 1"
        },
        {
          slot: "Cloak",
          bestInSlot: "Cloak of Protection\n+1 AC & +1 Saving Throws\n**Where to Find:** Sold by various Act 1 merchants or found in chests",
          secondaryOption: "Cape of the Red Prince\nFire Resistance bonus\n**Where to Find:** Rare loot from Act 1 encounters",
          tertiaryOption: "Cloak of Shadows\nGrants Invisibility spell once per day\n**Where to Find:** Found in Act 1 quests or Underdark"
        },
        {
          slot: "Amulet",
          bestInSlot: "Amulet of Misty Step\nGrants Misty Step spell for mobility\n**Where to Find:** Vendor at the Myconid Colony (Underdark)",
          secondaryOption: "Amulet of the Harpers\nBoosts saving throws & lore-related checks\n**Where to Find:** Druid Grove or vendor in the Myconid Colony",
          tertiaryOption: "Amulet of the Elements\nMinor resistance to elemental damage\n**Where to Find:** Vendor item in Druid Grove or Underdark"
        },
        {
          slot: "Ring (1)",
          bestInSlot: "Ring of Arcane Synergy\nBoosts spellcasting effectiveness\n**Where to Find:** Found in high-tier chests in Grymforge",
          secondaryOption: "Ring of Elemental Infusion\nBoosts elemental spell damage\n**Where to Find:** Random loot in Act 1, including Underdark chests",
          tertiaryOption: "Ring of Mind Shielding\nGrants resistance to psychic damage\n**Where to Find:** Looted in Underdark or strongbox in Act 1"
        },
        {
          slot: "Ring (2)",
          bestInSlot: "Ring of Protection\n+1 AC & +1 Saving Throws\n**Where to Find:** Purchased from vendors in Act 1 (Druid Grove or Underdark)",
          secondaryOption: "Ring of Evasion\nBoosts Dexterity-based saving throws\n**Where to Find:** Found in Act 1 dungeons or strongboxes",
          tertiaryOption: "Ring of Darkvision\nEnhances low-light vision\n**Where to Find:** Found in various Act 1 locations"
        },
        {
          slot: "Weapon (Main Hand)",
          bestInSlot: "Staff of Arcane Blessing\nEnhances spell DC and saving throws for allies\n**Where to Find:** Looted from a hidden location in the Underdark",
          secondaryOption: "The Spellsparkler\nElectrifies enemies when casting spells\n**Where to Find:** Reward from a quest in Act 1 (Druid Grove)",
          tertiaryOption: "Quarterstaff of Defense\n+1 AC when wielded\n**Where to Find:** Common vendor item in Act 1"
        },
        {
          slot: "Off-Hand (Shield or Focus)",
          bestInSlot: "Shield of Devotion\nBoosts AC and grants Shield spell reaction\n**Where to Find:** Sold by Act 1 vendors or lootable in Goblin Camp",
          secondaryOption: "Wand of the War Mage\nBoosts Spell Attack Rolls\n**Where to Find:** Looted from an enemy spellcaster in Act 1",
          tertiaryOption: "Magician's Staff\nGrants a minor spellcasting bonus\n**Where to Find:** Purchased from vendors in Act 1"
        }
      ]
    },
    {
      id: 'act2',
      name: 'Act 2',
      equipmentData: []
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
      name: "Fire Bolt",
      description: "Primary damage cantrip with good range and fire damage.",
      isHighlighted: true
    },
    {
      level: 0,
      name: "Ray of Frost",
      description: "Deals cold damage and reduces movement speed.",
      isHighlighted: true
    },
    {
      level: 0,
      name: "Minor Illusion",
      description: "Utility cantrip for creating distractions.",
      isHighlighted: false
    },
    {
      level: 1,
      name: "Magic Missile",
      description: "Never misses and deals force damage. Great for breaking concentration.",
      isHighlighted: true
    },
    {
      level: 1,
      name: "Burning Hands",
      description: "Cone-shaped fire damage, perfect for early AoE damage.",
      isHighlighted: true
    },
    {
      level: 1,
      name: "Shield",
      description: "Reaction spell that boosts AC and blocks Magic Missile.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Scorching Ray",
      description: "Multiple attack rolls for potential critical hits.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Misty Step",
      description: "Bonus action teleport for positioning or escaping.",
      isHighlighted: true
    },
    {
      level: 3,
      name: "Fireball",
      description: "Signature evocation spell with massive AoE damage.",
      isHighlighted: true
    },
    {
      level: 3,
      name: "Counterspell",
      description: "Essential for shutting down enemy spellcasters.",
      isHighlighted: true
    },
    {
      level: 4,
      name: "Wall of Fire",
      description: "Area control and consistent damage over time.",
      isHighlighted: true
    },
    {
      level: 4,
      name: "Greater Invisibility",
      description: "Concentration spell that grants advantage on attacks.",
      isHighlighted: false
    },
    {
      level: 5,
      name: "Cone of Cold",
      description: "Powerful cold damage in a cone shape.",
      isHighlighted: true
    },
    {
      level: 5,
      name: "Bigby's Hand",
      description: "Versatile force construct with multiple uses.",
      isHighlighted: false
    }
  ]
};