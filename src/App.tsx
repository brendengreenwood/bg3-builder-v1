import React, { useState, useMemo, useEffect, useRef } from "react";
import { Table } from "./components/Table";
import { ClassSelector } from "./components/ClassSelector";
import { ActTabs } from "./components/ActTabs";
import { ContentTabs } from "./components/ContentTabs";
import { SpellsTable } from "./components/SpellsTable";
import { AbilityScores } from "./components/AbilityScores";
import { classesData } from "./data/classesData";
import { LocationType, TabType } from "./types";
import {
  Flame,
  Zap,
  Filter,
  Share2,
  ChevronDown,
  X,
  Leaf,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { LibraryBrowser } from "./components/LibraryBrowser";

function App() {
  // Initialize state from URL parameters or defaults
  const [selectedClassId, setSelectedClassId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const classParam = params.get("class");
    return classesData.some((c) => c.id === classParam)
      ? classParam!
      : classesData[0].id;
  });

  const selectedClass =
    classesData.find((c) => c.id === selectedClassId) || classesData[0];

  const [selectedTab, setSelectedTab] = useState<TabType>(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") as TabType;
    return tabParam && ["armor", "spells"].includes(tabParam)
      ? tabParam
      : "armor";
  });

  const [selectedActId, setSelectedActId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const actParam = params.get("act");
    return selectedClass.acts.some((a) => a.id === actParam)
      ? actParam!
      : selectedClass.acts[0].id;
  });

  const selectedAct =
    selectedClass.acts.find((a) => a.id === selectedActId) ||
    selectedClass.acts[0];

  const [selectedSlot, setSelectedSlot] = useState<string | "all">(() => {
    const params = new URLSearchParams(window.location.search);
    const slotParam = params.get("slot");
    return slotParam || "all";
  });

  const [selectedLocation, setSelectedLocation] = useState<LocationType>(() => {
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("location") as LocationType;
    return locationParam &&
      ["all", "vendor", "quest", "loot", "craft", "boss"].includes(
        locationParam
      )
      ? locationParam
      : "all";
  });

  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [showSlotDrawer, setShowSlotDrawer] = useState(false);
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slotDrawerRef = useRef<HTMLDivElement>(null);
  const locationDrawerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close drawers when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        slotDrawerRef.current &&
        !slotDrawerRef.current.contains(event.target as Node)
      ) {
        setShowSlotDrawer(false);
      }
      if (
        locationDrawerRef.current &&
        !locationDrawerRef.current.contains(event.target as Node)
      ) {
        setShowLocationDrawer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update URL when selections change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("class", selectedClassId);
    params.set("tab", selectedTab);
    if (selectedTab === "armor") {
      params.set("act", selectedActId);
      if (selectedSlot !== "all") {
        params.set("slot", selectedSlot);
      }
      if (selectedLocation !== "all") {
        params.set("location", selectedLocation);
      }
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [
    selectedClassId,
    selectedTab,
    selectedActId,
    selectedSlot,
    selectedLocation,
  ]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (showSlotDrawer || showLocationDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSlotDrawer, showLocationDrawer]);

  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    const newClass =
      classesData.find((c) => c.id === classId) || classesData[0];
    setSelectedActId(newClass.acts[0].id);
    setSelectedSlot("all"); // Reset slot filter when changing class
    setSelectedLocation("all"); // Reset location filter when changing class
  };

  const getClassIcon = (classId: string) => {
    switch (classId) {
      case "oathbreaker-warlock":
        return <Zap size={24} className="text-purple-400" />;
      case "evoker-wizard":
        return <Flame size={24} className="text-orange-400" />;
      case "wild-shape-druid":
        return <Leaf size={24} className="text-green-400" />;
      default:
        return <Zap size={24} className="text-purple-400" />;
    }
  };

  // Get unique slot types from the current act's equipment data
  const slotOptions = useMemo(() => {
    if (!selectedAct.equipmentData.length) return [];

    const slots = selectedAct.equipmentData.map((item) => item.slot);
    return ["all", ...new Set(slots)];
  }, [selectedAct]);

  // Location filter options
  const locationOptions: {
    value: LocationType;
    label: string;
    icon: JSX.Element;
  }[] = [
    {
      value: "all",
      label: "All Locations",
      icon: <MapPin size={16} className="text-purple-400" />,
    },
    {
      value: "vendor",
      label: "Vendors",
      icon: <ShoppingBag size={16} className="text-purple-400" />,
    },
    {
      value: "quest",
      label: "Quest Rewards",
      icon: <Zap size={16} className="text-purple-400" />,
    },
    {
      value: "loot",
      label: "Loot/Chests",
      icon: <Zap size={16} className="text-purple-400" />,
    },
    {
      value: "craft",
      label: "Crafting",
      icon: <Zap size={16} className="text-purple-400" />,
    },
    {
      value: "boss",
      label: "Boss Drops",
      icon: <Zap size={16} className="text-purple-400" />,
    },
  ];

  // Helper function to determine if an item matches the location filter
  const matchesLocationFilter = (
    itemDescription: string,
    locationType: LocationType
  ): boolean => {
    if (locationType === "all") return true;

    const lowerDesc = itemDescription.toLowerCase();

    switch (locationType) {
      case "vendor":
        return (
          lowerDesc.includes("vendor") ||
          lowerDesc.includes("sold") ||
          lowerDesc.includes("purchased") ||
          lowerDesc.includes("merchant") ||
          lowerDesc.includes("shop")
        );
      case "quest":
        return (
          lowerDesc.includes("quest") ||
          lowerDesc.includes("reward") ||
          lowerDesc.includes("completing")
        );
      case "loot":
        return (
          lowerDesc.includes("loot") ||
          lowerDesc.includes("chest") ||
          lowerDesc.includes("found") ||
          lowerDesc.includes("strongbox")
        );
      case "craft":
        return (
          lowerDesc.includes("craft") ||
          lowerDesc.includes("forge") ||
          lowerDesc.includes("forged")
        );
      case "boss":
        return (
          lowerDesc.includes("boss") ||
          lowerDesc.includes("defeat") ||
          lowerDesc.includes("dropped") ||
          lowerDesc.includes("looted from")
        );
      default:
        return true;
    }
  };

  // Filter equipment data by selected slot and location
  const filteredEquipmentData = useMemo(() => {
    let filtered = selectedAct.equipmentData;

    // Filter by slot
    if (selectedSlot !== "all") {
      filtered = filtered.filter((item) => item.slot === selectedSlot);
    }

    // Filter by location
    if (selectedLocation !== "all") {
      filtered = filtered.filter((item) => {
        // Check if any of the item options match the location filter
        return (
          (item.bestInSlot &&
            matchesLocationFilter(item.bestInSlot, selectedLocation)) ||
          (item.secondaryOption &&
            matchesLocationFilter(item.secondaryOption, selectedLocation)) ||
          (item.tertiaryOption &&
            matchesLocationFilter(item.tertiaryOption, selectedLocation))
        );
      });
    }

    return filtered;
  }, [selectedAct.equipmentData, selectedSlot, selectedLocation]);

  // Copy current URL to clipboard
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setShowSlotDrawer(false);
  };

  const handleLocationSelect = (location: LocationType) => {
    setSelectedLocation(location);
    setShowLocationDrawer(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <ClassSelector
          classes={classesData}
          selectedClass={selectedClassId}
          onSelectClass={handleClassChange}
          isMobile={isMobile}
        />

        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              {getClassIcon(selectedClassId)}
              <h1 className="text-3xl font-bold text-purple-300">
                {selectedClass.name} Build
              </h1>
            </div>
            <div className="relative">
              <button
                onClick={handleShareClick}
                className="flex items-center gap-2 bg-purple-800 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              {showShareTooltip && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white px-3 py-2 rounded shadow-lg text-sm z-10">
                  Link copied to clipboard!
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-400 mb-2">{selectedClass.description}</p>
          <p className="text-sm text-gray-500">
            Optimal build guide for Baldur's Gate 3
          </p>
        </header>

        {/* Ability Scores Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            Recommended Ability Scores
          </h2>
          <AbilityScores
            scores={selectedClass.abilityScores}
            isMobile={isMobile}
          />
        </div>

        <ContentTabs
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          isMobile={isMobile}
        />

        {selectedTab === "armor" ? (
          <>
            <ActTabs
              classData={selectedClass}
              selectedAct={selectedActId}
              onSelectAct={setSelectedActId}
              isMobile={isMobile}
            />

            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-900">
              <div className="p-4 bg-gray-800 border-b border-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div className="flex items-center gap-2">
                  {isMobile ? (
                    <button
                      onClick={() => setShowSlotDrawer(true)}
                      className="flex items-center gap-2 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={!slotOptions.length}
                    >
                      <Filter size={16} className="text-purple-400" />
                      <span className="truncate max-w-[150px]">
                        {selectedSlot === "all"
                          ? "All Equipment Slots"
                          : selectedSlot}
                      </span>
                      <ChevronDown size={16} className="text-purple-400" />
                    </button>
                  ) : (
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={!slotOptions.length}
                    >
                      {slotOptions.length ? (
                        slotOptions.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot === "all" ? "All Equipment Slots" : slot}
                          </option>
                        ))
                      ) : (
                        <option value="all">No equipment data</option>
                      )}
                    </select>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isMobile ? (
                    <button
                      onClick={() => setShowLocationDrawer(true)}
                      className="flex items-center gap-2 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <MapPin size={16} className="text-purple-400" />
                      <span className="truncate max-w-[150px]">
                        {locationOptions.find(
                          (loc) => loc.value === selectedLocation
                        )?.label || "All Locations"}
                      </span>
                      <ChevronDown size={16} className="text-purple-400" />
                    </button>
                  ) : (
                    <select
                      value={selectedLocation}
                      onChange={(e) =>
                        setSelectedLocation(e.target.value as LocationType)
                      }
                      className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {locationOptions.map((location) => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <Table data={filteredEquipmentData} isMobile={isMobile} />
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-purple-900">
              <div className="p-4 bg-gray-800 border-b border-gray-700">
                <h2 className="text-lg font-medium text-purple-300">
                  Recommended Spells
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Spells marked with{" "}
                  <Zap size={14} className="text-purple-400 inline" /> are
                  highly recommended for this build
                </p>
              </div>
              <div className="p-4">
                <SpellsTable
                  spells={selectedClass.spells}
                  isMobile={isMobile}
                />
              </div>
            </div>
            <LibraryBrowser />
          </>
        )}
      </div>

      {/* Mobile Slot Selection Drawer */}
      {isMobile && showSlotDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div
            ref={slotDrawerRef}
            className="bg-gray-800 rounded-t-xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-slide-up"
          >
            <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                Select Equipment Slot
              </h3>
              <button
                onClick={() => setShowSlotDrawer(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {slotOptions.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleSlotSelect(slot)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                      selectedSlot === slot
                        ? "bg-purple-700 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {slot === "all" ? "All Equipment Slots" : slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Location Selection Drawer */}
      {isMobile && showLocationDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div
            ref={locationDrawerRef}
            className="bg-gray-800 rounded-t-xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-slide-up"
          >
            <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                Select Location Type
              </h3>
              <button
                onClick={() => setShowLocationDrawer(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {locationOptions.map((location) => (
                  <button
                    key={location.value}
                    onClick={() => handleLocationSelect(location.value)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center gap-3 ${
                      selectedLocation === location.value
                        ? "bg-purple-700 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {location.icon}
                    {location.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
