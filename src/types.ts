// types file so the compiler wont get mad

declare function log(context: any, obj: any);
declare function print(text: any);

declare function readString(path: string);
declare function readBytes(path: string);
declare function loadMusic(path: string);
declare function loadSound(path: string);

declare function readFile(purpose: string, ext: string, cons: Function);
declare function readBinFile(purpose: string, ext: string, cons: Function);
declare function writeFile(purpose: string, ext: string, cons: Function);
declare function writeBinFile(purpose: string, ext: string, cons: Function);

declare const scriptName: string;
declare const modName: string;

//js 'extend(Base, ..., {})' = java 'new Base(...) {}'
declare function extend(Base: any, ...arguments: any, def: object);

//these are not strictly necessary, but are kept for edge cases
declare function run(method: Function);
declare function boolf(method: Function);
declare function boolp(method: Function);
declare function floatf(method: Function);
declare function floatp(method: Function);
declare function cons(method: Function);
declare function prov(method: Function);
declare function func(method: Function);

declare function newEffect(lifetime: number, renderer: Function);
declare function Call();

//nope

// importPackage(Packages.arc)
// importPackage(Packages.arc.func)
// importPackage(Packages.arc.graphics)
// importPackage(Packages.arc.graphics.g2d)
// importPackage(Packages.arc.graphics.gl)
// importPackage(Packages.arc.math)
// importPackage(Packages.arc.math.geom)
// importPackage(Packages.arc.scene)
// importPackage(Packages.arc.scene.actions)
// importPackage(Packages.arc.scene.event)
// importPackage(Packages.arc.scene.style)
// importPackage(Packages.arc.scene.ui)
// importPackage(Packages.arc.scene.ui.layout)
// importPackage(Packages.arc.scene.utils)
// importPackage(Packages.arc.struct)
// importPackage(Packages.arc.util)
// Packages.mindustry
declare let ClientLauncher: object;	 
declare let Vars: object;
// importPackage(Packages.mindustry.ai)
// importPackage(Packages.mindustry.ai.formations)
// importPackage(Packages.mindustry.ai.formations.patterns)
// importPackage(Packages.mindustry.ai.types)
// importPackage(Packages.mindustry.async)
// importPackage(Packages.mindustry.audio)
// importPackage(Packages.mindustry.content)
// importPackage(Packages.mindustry.core)
// importPackage(Packages.mindustry.ctype)
// importPackage(Packages.mindustry.editor)
// importPackage(Packages.mindustry.entities)
// importPackage(Packages.mindustry.entities.abilities)
// importPackage(Packages.mindustry.entities.bullet)
// importPackage(Packages.mindustry.entities.comp)
// importPackage(Packages.mindustry.entities.effect)
// importPackage(Packages.mindustry.entities.units)
// importPackage(Packages.mindustry.game)
// importPackage(Packages.mindustry.gen)
// importPackage(Packages.mindustry.graphics)
// importPackage(Packages.mindustry.graphics.g3d)
// importPackage(Packages.mindustry.input)
// importPackage(Packages.mindustry.io)
// importPackage(Packages.mindustry.logic)
// importPackage(Packages.mindustry.maps)
// importPackage(Packages.mindustry.maps.filters)
// importPackage(Packages.mindustry.maps.generators)
// importPackage(Packages.mindustry.maps.planet)
// importPackage(Packages.mindustry.net)
// importPackage(Packages.mindustry.type)
// importPackage(Packages.mindustry.type.weather)
// importPackage(Packages.mindustry.ui)
// importPackage(Packages.mindustry.ui.dialogs)
// importPackage(Packages.mindustry.ui.fragments)
// importPackage(Packages.mindustry.ui.layout)
// importPackage(Packages.mindustry.world)
// importPackage(Packages.mindustry.world.blocks)
// importPackage(Packages.mindustry.world.blocks.campaign)
// importPackage(Packages.mindustry.world.blocks.defense)
// importPackage(Packages.mindustry.world.blocks.defense.turrets)
// importPackage(Packages.mindustry.world.blocks.distribution)
// importPackage(Packages.mindustry.world.blocks.environment)
// importPackage(Packages.mindustry.world.blocks.experimental)
// importPackage(Packages.mindustry.world.blocks.legacy)
// importPackage(Packages.mindustry.world.blocks.liquid)
// importPackage(Packages.mindustry.world.blocks.logic)
// importPackage(Packages.mindustry.world.blocks.payloads)
// importPackage(Packages.mindustry.world.blocks.power)
// importPackage(Packages.mindustry.world.blocks.production)
// importPackage(Packages.mindustry.world.blocks.sandbox)
// importPackage(Packages.mindustry.world.blocks.storage)
// importPackage(Packages.mindustry.world.blocks.units)
// importPackage(Packages.mindustry.world.consumers)
// importPackage(Packages.mindustry.world.draw)
// importPackage(Packages.mindustry.world.meta)
// importPackage(Packages.mindustry.world.meta.values)
// importPackage(Packages.mindustry.world.modules)
declare const PlayerIpUnbanEvent: unknown;
declare const PlayerIpBanEvent: unknown;
declare const PlayerUnbanEvent: unknown;
declare const PlayerBanEvent: unknown;
declare const PlayerLeave: unknown;
declare const PlayerConnect: unknown;
declare const PlayerJoin: unknown;
declare const UnitChangeEvent: unknown;
declare const UnitCreateEvent: unknown;
declare const UnitDrownEvent: unknown;
declare const BlockDestroyEvent: unknown;
declare const UnitDestroyEvent: unknown;
declare const BuildSelectEvent: unknown;
declare const BlockBuildEndEvent: unknown;
declare const BlockBuildBeginEvent: unknown;
declare const ResearchEvent: unknown;
declare const UnlockEvent: unknown;
declare const StateChangeEvent: unknown;
declare const TileChangeEvent: unknown;
declare const GameOverEvent: unknown;
declare const UnitControlEvent: unknown;
declare const PickupEvent: unknown;
declare const TapEvent: unknown;
declare const ConfigEvent: unknown;
declare const DepositEvent: unknown;
declare const WithdrawEvent: unknown;
declare const SectorCaptureEvent: unknown;
declare const PlayerChatEvent: unknown;
declare const ClientPreConnectEvent: unknown;
declare const CommandIssueEvent: unknown;
declare const SchematicCreateEvent: unknown;
declare const SectorLaunchEvent: unknown;
declare const LaunchItemEvent: unknown;
declare const SectorInvasionEvent: unknown;
declare const SectorLoseEvent: unknown;
declare const WorldLoadEvent: unknown;
declare const ClientLoadEvent: unknown;
declare const BlockInfoEvent: unknown;
declare const CoreItemDeliverEvent: unknown;
declare const TurretAmmoDeliverEvent: unknown;
declare const LineConfirmEvent: unknown;
declare const TurnEvent: unknown;
declare const WaveEvent: unknown;
declare const ResetEvent: unknown;
declare const PlayEvent: unknown;
declare const DisposeEvent: unknown;
declare const ServerLoadEvent: unknown;
declare const ClientCreateEvent: unknown;
declare const SaveLoadEvent: unknown;
declare const MapPublishEvent: unknown;
declare const MapMakeEvent: unknown;
declare const ResizeEvent: unknown;
declare const LoseEvent: unknown;
declare const Trigger: unknown;
declare const WinEvent: unknown;