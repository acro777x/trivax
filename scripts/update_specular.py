with open('src/components/ui/SpecularButton.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Add href, target, rel to params
old_decl = "  type = 'button',\n  style,\n  ...rest\n}) => {"
new_decl = "  href,\n  target,\n  rel,\n  type = 'button',\n  style,\n  ...rest\n}) => {"
text = text.replace(old_decl, new_decl)

# Update return statement
target_str = "  return (\n    <button\n      ref={buttonRef}\n      type={type}"
if target_str in text:
    replacement = """  const handleLinkClick = (e) => {
    if (onClick) onClick(e);
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = id;
    }
  };

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target={target}
        rel={rel}
        onClick={handleLinkClick}
        className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
        style={{
          '--sb-radius': `${radius}px`,
          '--sb-tint': tint,
          '--sb-tint-opacity': tintOpacity,
          '--sb-blur': `${blur}px`,
          '--sb-text-color': textColor,
          textDecoration: 'none',
          ...style
        }}
        {...rest}
      >
        <canvas ref={canvasRef} className="specular-button__light" aria-hidden="true" />
        <span className="specular-button__label">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}"""
    text = text.replace(target_str, replacement)
    with open('src/components/ui/SpecularButton.jsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print('SpecularButton updated successfully')
else:
    print('Target string not found')
