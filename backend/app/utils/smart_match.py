from rapidfuzz import fuzz

def best_match(query, options, threshold=60):
    """
    Returns the closest similarity matched string.
    threshold: minimum % similarity for a match.
    """
    if not options:
        return None

    best = None
    best_score = 0

    for opt in options:
        score = fuzz.token_sort_ratio(query.lower(), opt.lower())
        if score > best_score:
            best_score = score
            best = opt

    if best_score < threshold:
        return None

    return best
