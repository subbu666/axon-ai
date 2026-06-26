// src/components/icons/index.jsx
// Imports every SVG as a raw string via Vite's ?raw suffix.
// The createIcon factory handles currentColor injection and accessibility props.
// NEVER paste SVG path data manually — the files are the source of truth.

import arrowPathRaw       from '../../assets/icons/arrow-path.svg?raw';
import arrowTrendingUpRaw from '../../assets/icons/arrow-trending-up.svg?raw';
import chartPieRaw        from '../../assets/icons/chart-pie.svg?raw';
import chevronDownRaw     from '../../assets/icons/chevron-down.svg?raw';
import chevronLeftRaw     from '../../assets/icons/chevron-left.svg?raw';
import chevronRightRaw    from '../../assets/icons/chevron-right.svg?raw';
import chevronUpRaw       from '../../assets/icons/chevron-up.svg?raw';
import chevronUpSolidRaw  from '../../assets/icons/chevron-up-solid.svg?raw';
import cogRaw             from '../../assets/icons/cog-8-tooth.svg?raw';
import cubeRaw            from '../../assets/icons/cube-16-solid.svg?raw';
import linkRaw            from '../../assets/icons/link.svg?raw';
import linkSolidRaw       from '../../assets/icons/link-solid.svg?raw';
import searchRaw          from '../../assets/icons/search.svg?raw';
import xMarkRaw           from '../../assets/icons/x-mark.svg?raw';

/**
 * Processes raw SVG string:
 *   - Removes hardcoded width/height from the <svg> root (file export dimensions)
 *   - Replaces all #000000 fill/stroke values with currentColor
 *   - Injects size (as both width and height), role, aria-label, className into <svg>
 */
function processSvg(raw, size, ariaLabel, className) {
  return raw
    // Strip hardcoded export dimensions — e.g. width="24" height="24"
    .replace(/\s(width|height)="[^"]*"/g, '')
    // Replace all hardcoded black fill/stroke with currentColor
    .replace(/fill="#000000"/g,   'fill="currentColor"')
    .replace(/stroke="#000000"/g, 'stroke="currentColor"')
    // Inject our dynamic attributes into the opening <svg tag
    .replace(
      '<svg',
      `<svg width="${size}" height="${size}" role="img" aria-label="${ariaLabel}" class="${className}"`
    );
}

/**
 * Factory: given a raw SVG string and display name, returns a React component.
 * The component accepts: size (px number), aria-label override, className string.
 */
function createIcon(rawSvg, displayName) {
  function Icon({ size = 24, 'aria-label': label = displayName, className = '' }) {
    return (
      <span
        style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
        dangerouslySetInnerHTML={{
          __html: processSvg(rawSvg, size, label, className),
        }}
      />
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

// ─── Exported icon components ────────────────────────────────────────────────
// Names match the placement map below. Import by name wherever needed.

export const ArrowPathIcon       = createIcon(arrowPathRaw,       'Refresh');
export const ArrowTrendingUpIcon = createIcon(arrowTrendingUpRaw, 'Trending up');
export const ChartPieIcon        = createIcon(chartPieRaw,        'Analytics chart');
export const ChevronDownIcon     = createIcon(chevronDownRaw,     'Expand');
export const ChevronLeftIcon     = createIcon(chevronLeftRaw,     'Previous');
export const ChevronRightIcon    = createIcon(chevronRightRaw,    'Next');
export const ChevronUpIcon       = createIcon(chevronUpRaw,       'Collapse');
export const ChevronUpSolidIcon  = createIcon(chevronUpSolidRaw,  'Collapse');
export const CogIcon             = createIcon(cogRaw,             'Settings');
export const CubeIcon            = createIcon(cubeRaw,            '3D workflow');
export const LinkIcon            = createIcon(linkRaw,            'Link');
export const LinkSolidIcon       = createIcon(linkSolidRaw,       'Link');
export const SearchIcon          = createIcon(searchRaw,          'Search');
export const XMarkIcon           = createIcon(xMarkRaw,           'Close');
