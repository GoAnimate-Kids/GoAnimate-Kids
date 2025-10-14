# GoAnimate Kids
GoAnimate Kids is the children's version of Wrapper: Offline.

## Running / Installation
To start GoAnimate Kids on Windows, Download and run the installer [here]((https://goanimatekids.weebly.com/)) It'll automate just about everything for you and, well, start GoAnimate Kids.

If you want to import videos and characters from the original GoAnimate or any other clones of it, open its folder and drag the "_SAVED" folder into GoAnimate's "wrapper" folder. If you have already made any videos or characters, this will not work. Please only import on a new install with no saved characters or videos, or take the "_SAVED" folder in GoAnimate out before dragging the old one in. If you want to import character IDs from the original LVM, you can paste `&original_asset_id=[ID HERE]` at the end of the link for the matching character creator.

## Development
To run GoAnimate with a development server, run the following under the root folder of GoAnimate:
```
npm run dev
```

### Previewing
To run GoAnimate without starting a development server:
```
npm run preview
```

### Packaging
To build a full copy of GoAnimate:
```
npm run package
```
*You will need to copy the `resources` folder manually.*

## Footnotes
[1] - See <https://www.gnu.org/philosophy/free-sw.html> for a better definition of free software.
