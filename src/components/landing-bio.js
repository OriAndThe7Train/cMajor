import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Canvas } from "react-three-fiber"
import styled from "@emotion/styled"
import App from "../pendulumSim/canvas"

const Container = styled.div`
  text-align: center;
  margin-top: 0rem;
  margin-bottom: 1rem;
  width: 80vw;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  flex-direction: row;
`

const Description = styled.p`
  padding: 10;
  margin-bottom: 1.4rem;
  font-size: 1.4rem;
`

const NameHeader = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0;
`

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={(data) => (
      <OuterContainer>
        <Container>
          <App />
          <NameHeader>{data.site.siteMetadata.title}</NameHeader>
          <Description>{data.site.siteMetadata.subtitle}</Description>
        </Container>
      </OuterContainer>
    )}
  />
)

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio
