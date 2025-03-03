import { ClassData } from '../types';

export const oathbreakerWarlockData: ClassData = {
  id: 'oathbreaker-warlock',
  name: 'Oathbreaker Warlock',
  description: 'A powerful warlock build that combines dark magic with martial prowess',
  abilityScores: {
    strength: 16,
    dexterity: 10,
    constitution: 14,
    intelligence: 8,
    wisdom: 12,
    charisma: 16
  },
  acts: [
    {
      id: 'act1',
      name: 'Act 1',
      equipmentData: []
    },
    {
      id: 'act2',
      name: 'Act 2',
      equipmentData: []
    },
    {
      id: 'act3',
      name: 'Act 3',
      equipmentData: [
        {
          slot: "Helmet",
          bestInSlot: "Helldusk Helm\nHigh AC, advantage vs. spells, strong resistances\n**Where to Find:** House of Hope (Raphael's domain)",
          secondaryOption: "Birthright\n+2 CHA boost\n**Where to Find:** Act 3 vendors (Lower City, Sorcerous Sundries)",
          tertiaryOption: "Hood of the Weave\nSpell buffs, minor defenses\n**Where to Find:** Random loot or vendor in Act 2/3"
        },
        {
          slot: "Chest (Heavy Armor)",
          bestInSlot: "Helldusk Armor\n~21+ AC, high resistances\n**Where to Find:** Wyrmway (Defeat Ansur)",
          secondaryOption: "Reverberation (Adamantine Splint)\nStrong pre-Act 3 heavy armor\n**Where to Find:** Forged in Grymforge (Act 1/2)",
          tertiaryOption: "Heavy Plate +2/+3\nSolid AC but no special perks\n**Where to Find:** High-level vendors or random loot"
        },
        {
          slot: "Gloves",
          bestInSlot: "Helldusk Gloves\nResistances, strong defense\n**Where to Find:** House of Hope (Chests or Raphael's minions)",
          secondaryOption: "Gauntlets of Hill Giant Strength\nSets STR to 23\n**Where to Find:** Act 3 vendors or special loot chests",
          tertiaryOption: "Gauntlets of the Forge\nFire resistance, niche perks\n**Where to Find:** Adamantine Forge crafting or Act 2/3 loot"
        },
        {
          slot: "Boots",
          bestInSlot: "Helldusk Boots\nImmunity to knockback, fire resistance\n**Where to Find:** House of Hope (Chests in Raphael's domain)",
          secondaryOption: "Boots of Genial Striding\nExtra movement speed\n**Where to Find:** Act 3 vendors or late-game chests",
          tertiaryOption: "Boots of Speed\nDouble movement effect (Haste-like)\n**Where to Find:** Rare vendor item or loot drop"
        },
        {
          slot: "Cloak",
          bestInSlot: "Cloak of Displacement\nEnemies have disadvantage until hit once per round\n**Where to Find:** Often sold in Act 2/3 vendors or rare loot",
          secondaryOption: "Cloak of Protection\n+1 AC & Saving Throws\n**Where to Find:** Mid-to-late game vendor item or random loot",
          tertiaryOption: "Cloak of the Weave\nMinor spell buffs, unique perks\n**Where to Find:** Random loot or vendor in Act 2/3"
        },
        {
          slot: "Amulet",
          bestInSlot: "Amulet of Greater Health\nSets CON to 23\n**Where to Find:** Late-game vendors or chests (Lower City)",
          secondaryOption: "Amulet of Devout\n+1 or +2 to Spell Save DC\n**Where to Find:** Various Act 3 vendors or loot",
          tertiaryOption: "Brooch of Shielding\nResistance to force damage\n**Where to Find:** Random loot or vendor in Act 2/3"
        },
        {
          slot: "Ring (1)",
          bestInSlot: "Ring of Regeneration\nGradual healing each turn\n**Where to Find:** Act 2/3 vendors or Gauntlet of Shar chests",
          secondaryOption: "Caustic Band\nFlat acid damage to melee attacks\n**Where to Find:** Late-game loot or vendors",
          tertiaryOption: "Killer's Sweetheart\nBonus damage with risk\n**Where to Find:** Late-game loot or vendors"
        },
        {
          slot: "Ring (2)",
          bestInSlot: "Risky Ring\nAdvantage on attack rolls, disadvantage on saves\n**Where to Find:** Lower City vendors or high-tier chests",
          secondaryOption: "Ring of Psionic Protection\nAdvantage on mental saves\n**Where to Find:** Act 3 vendors or special loot",
          tertiaryOption: "Strife/Fling Rings\nVarious elemental effects or unique buffs\n**Where to Find:** Quest rewards or vendor loot"
        },
        {
          slot: "Weapon (Two-Hander)",
          bestInSlot: "Balduran's Giantslayer (Ansur's Sword)\nHigh damage, bonus vs. large foes\n**Where to Find:** Looted from Ansur (Wyrmway)",
          secondaryOption: "Nyrulna (Legendary Spear)\nThrowable, flight aura\n**Where to Find:** Circus of the Last Days side quest (Act 3)",
          tertiaryOption: "Silver Sword of the Astral Plane\nStrong greatsword, overshadowed late-game\n**Where to Find:** Creche Y'llek reward (Act 1/2)"
        },
        {
          slot: "Shield (If 1-Hand)",
          bestInSlot: "Shield of the Undevout / Shield of Devotion\nHigh AC, unique defensive perks\n**Where to Find:** Act 3 merchants or miniboss loot",
          secondaryOption: "Adamantine Shield\nNegates crits\n**Where to Find:** Forged in Grymforge (Act 1/2)",
          tertiaryOption: "Any +2/+3 Shield\nDecent AC, generic option\n**Where to Find:** Late-game vendors or random loot"
        }
      ]
    }
  ],
  spells: [
    {
      level: 0,
      name: "Eldritch Blast",
      description: "Your primary damage cantrip. Scales with level and can be enhanced with Invocations.",
      isHighlighted: true
    },
    {
      level: 0,
      name: "Minor Illusion",
      description: "Versatile utility cantrip for creating distractions or hiding.",
      isHighlighted: false
    },
    {
      level: 1,
      name: "Hex",
      description: "Essential for boosting your damage output and applying disadvantage on ability checks.",
      isHighlighted: true
    },
    {
      level: 1,
      name: "Armor of Agathys",
      description: "Provides temporary HP and deals cold damage to attackers. Scales well with spell slots.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Darkness",
      description: "Combined with Devil's Sight invocation, gives you advantage on attacks while enemies have disadvantage.",
      isHighlighted: true
    },
    {
      level: 2,
      name: "Misty Step",
      description: "Excellent mobility spell for positioning or escaping danger.",
      isHighlighted: false
    },
    {
      level: 3,
      name: "Counterspell",
      description: "Essential for shutting down enemy spellcasters.",
      isHighlighted: true
    },
    {
      level: 3,
      name: "Fireball",
      description: "Powerful AoE damage for clearing groups of enemies.",
      isHighlighted: false
    },
    {
      level: 4,
      name: "Banishment",
      description: "Temporarily removes dangerous enemies from combat.",
      isHighlighted: false
    },
    {
      level: 4,
      name: "Dimension Door",
      description: "Superior teleportation for escaping or accessing difficult areas.",
      isHighlighted: true
    },
    {
      level: 5,
      name: "Hold Monster",
      description: "Paralyzes enemies, allowing for critical hits and control.",
      isHighlighted: true
    }
  ]
};