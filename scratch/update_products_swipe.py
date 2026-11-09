with open('src/domains/products/components/products-section.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. State and refs addition
target_state = """  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const qa = isQaMode();"""

replacement_state = """  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const qa = isQaMode();

  const featuredRailRef = useRef<HTMLDivElement>(null);
  const [featuredActiveIdx, setFeaturedActiveIdx] = useState(0);
  const [featuredCanLeft, setFeaturedCanLeft] = useState(false);
  const [featuredCanRight, setFeaturedCanRight] = useState(true);

  // Touch drag tracking to allow silky smooth swiping without accidental clicks
  const isDraggingRail = useRef(false);
  const railStartX = useRef(0);
  const railMoved = useRef(false);

  const onRailTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRail.current = true;
    railMoved.current = false;
    railStartX.current = e.touches[0].clientX;
  };

  const onRailTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRail.current) return;
    const diff = Math.abs(e.touches[0].clientX - railStartX.current);
    if (diff > 8) {
      railMoved.current = true;
    }
  };

  const onRailTouchEnd = () => {
    isDraggingRail.current = false;
    setTimeout(() => {
      railMoved.current = false;
    }, 100);
  };

  const checkFeaturedScroll = useCallback(() => {
    if (!featuredRailRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = featuredRailRef.current;
    setFeaturedCanLeft(scrollLeft > 10);
    setFeaturedCanRight(scrollLeft < scrollWidth - clientWidth - 10);
    const cardWidth = featuredRailRef.current.firstElementChild?.clientWidth || 300;
    const idx = Math.round(scrollLeft / (cardWidth + 20));
    setFeaturedActiveIdx(Math.min(featuredProducts.length - 1, Math.max(0, idx)));
  }, [featuredProducts.length]);

  useEffect(() => {
    const el = featuredRailRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkFeaturedScroll, { passive: true });
    checkFeaturedScroll();
    return () => el.removeEventListener('scroll', checkFeaturedScroll);
  }, [checkFeaturedScroll]);

  const slideFeaturedLeft = () => {
    if (!featuredRailRef.current) return;
    featuredRailRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const slideFeaturedRight = () => {
    if (!featuredRailRef.current) return;
    featuredRailRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const scrollToFeatured = (index: number) => {
    if (!featuredRailRef.current) return;
    const cards = featuredRailRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };"""

# 2. Featured rail update
target_rail = """          {/* Mobile / Tablet Snap Rail */}
          <div className=\"flex lg:hidden overflow-x-auto snap-x snap-proximity gap-5 pb-6 -mx-5 px-5 scrollbar-none touch-pan-y overscroll-x-contain\">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className=\"snap-center shrink-0 w-[84vw] max-w-[340px]\"
              >
                <div
                  role=\"button\"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenProduct(product.slug);
                    }
                  }}
                  onClick={() => onOpenProduct(product.slug)}"""

replacement_rail = """          {/* Mobile / Tablet Snap Rail with Smooth Dual-Axis Swipe */}
          <div
            ref={featuredRailRef}
            onTouchStart={onRailTouchStart}
            onTouchMove={onRailTouchMove}
            onTouchEnd={onRailTouchEnd}
            className=\"flex lg:hidden overflow-x-auto snap-x snap-proximity gap-5 pb-6 -mx-5 px-5 scrollbar-none touch-swipe-rail touch-pan-x touch-pan-y overscroll-x-contain\"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className=\"snap-center shrink-0 w-[84vw] max-w-[340px]\"
              >
                <div
                  role=\"button\"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenProduct(product.slug);
                    }
                  }}
                  onClick={() => {
                    if (railMoved.current) return;
                    onOpenProduct(product.slug);
                  }}"""

# 3. Mobile Featured controls insertion
target_after_rail = """            ))}
          </div>

          {/* Desktop 3-up Cards with Star Border & Scroll-Triggered Cascade */}"""

replacement_after_rail = """            ))}
          </div>

          {/* Mobile Swipe Indicators & Controls for Featured Trio */}
          <div className=\"flex lg:hidden items-center justify-between -mt-2 mb-8 px-1\">
            <div className=\"flex items-center gap-1.5\">
              {featuredProducts.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type=\"button\"
                  onClick={() => scrollToFeatured(dotIdx)}
                  aria-label={`Go to product ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    featuredActiveIdx === dotIdx ? 'w-6 bg-primary' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className=\"flex items-center gap-2\">
              <span className=\"text-[11px] font-mono text-text-muted mr-1\">Swipe ← →</span>
              <button
                type=\"button\"
                onClick={slideFeaturedLeft}
                disabled={!featuredCanLeft}
                aria-label=\"Previous featured product\"
                className={`p-2 rounded-full border transition-all ${
                  featuredCanLeft
                    ? 'border-white/20 bg-surface/80 text-white active:scale-90 hover:border-primary/50'
                    : 'border-white/5 bg-surface/30 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className=\"w-3.5 h-3.5\" />
              </button>
              <button
                type=\"button\"
                onClick={slideFeaturedRight}
                disabled={!featuredCanRight}
                aria-label=\"Next featured product\"
                className={`p-2 rounded-full border transition-all ${
                  featuredCanRight
                    ? 'border-white/20 bg-surface/80 text-white active:scale-90 hover:border-primary/50'
                    : 'border-white/5 bg-surface/30 text-white/30 cursor-not-allowed'
                }`}
              >
                <ChevronRight className=\"w-3.5 h-3.5\" />
              </button>
            </div>
          </div>

          {/* Desktop 3-up Cards with Star Border & Scroll-Triggered Cascade */}"""

# 4. Compact slider update
target_compact = """          {/* Sliding Track: slide-wise left to right */}
          <div
            ref={(node) => {
              (sliderRef as any).current = node;
              (compactGridRef as any).current = node;
            }}
            className=\"flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-proximity pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none touch-pan-y overscroll-x-contain\""""

replacement_compact = """          {/* Sliding Track: slide-wise left to right with Touch Drag */}
          <div
            ref={(node) => {
              (sliderRef as any).current = node;
              (compactGridRef as any).current = node;
            }}
            onTouchStart={onRailTouchStart}
            onTouchMove={onRailTouchMove}
            onTouchEnd={onRailTouchEnd}
            className=\"flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-proximity pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none touch-swipe-rail touch-pan-x touch-pan-y overscroll-x-contain\""""

target_compact_click = """                  onClick={() => onOpenProduct(product.slug)}"""
replacement_compact_click = """                  onClick={() => {
                    if (railMoved.current) return;
                    onOpenProduct(product.slug);
                  }}"""

c_norm = c.replace('\r\n', '\n')
target_state_norm = target_state.replace('\r\n', '\n')
target_rail_norm = target_rail.replace('\r\n', '\n')
target_after_rail_norm = target_after_rail.replace('\r\n', '\n')
target_compact_norm = target_compact.replace('\r\n', '\n')

assert target_state_norm in c_norm, 'target_state not found'
assert target_rail_norm in c_norm, 'target_rail not found'
assert target_after_rail_norm in c_norm, 'target_after_rail not found'
assert target_compact_norm in c_norm, 'target_compact not found'

c_norm = c_norm.replace(target_state_norm, replacement_state)
c_norm = c_norm.replace(target_rail_norm, replacement_rail)
c_norm = c_norm.replace(target_after_rail_norm, replacement_after_rail)
c_norm = c_norm.replace(target_compact_norm, replacement_compact)
c_norm = c_norm.replace(target_compact_click, replacement_compact_click)

with open('src/domains/products/components/products-section.tsx', 'w', encoding='utf-8') as f:
    f.write(c_norm)

print('Updated products-section.tsx successfully!')
