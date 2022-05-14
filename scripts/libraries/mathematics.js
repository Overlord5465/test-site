function distanceBetweenPointsPlane(x1, y1, x2, y2) {
  const answer = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
  return answer;
}

// console.log(distanceBetweenPointsPlane(0, 0, 5, 5));